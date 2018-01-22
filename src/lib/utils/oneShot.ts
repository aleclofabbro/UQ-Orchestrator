import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';
type PendingObj = {
  pending: boolean;
  since: Date;
};

const getPendingObj = (pending: boolean) => (): PendingObj => ({ pending, since: new Date() });
const isNotPending = getPendingObj(false);
const isPending = getPendingObj(true);
const makeSingleRequester = <R, S>(
  service: (param: R) => Observable<S>
) => {
  const trigger$ = new Subject<R>();

  const request$ = trigger$
    .mergeMap(param => pending$
      .take(1)
      .filter(v => !v.pending)
      .mapTo(param))
    .publish().refCount();

  const response$ = request$
    .mergeMap(req => service(req)
      // .takeUntil(trigger$)
    )
    .startWith(undefined)
    .publish().refCount();

  const pending$: Observable<{ pending: boolean, since: Date }> = Observable.merge(
    request$.map(isPending),
    response$.map(isNotPending)
  ).startWith(isNotPending()).publishReplay(1).refCount();

  return {
    request$: request$.startWith(null),
    pending$,
    response$: response$.startWith(null),
    trigger: (req: R) => trigger$.next(req)
  };
};

export default makeSingleRequester;
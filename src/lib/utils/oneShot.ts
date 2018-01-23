import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import { BehaviorSubject } from '@reactivex/rxjs/dist/package/BehaviorSubject';
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
  // TODO: try remove share, publish and take 1 mapTo
  // using local subject for pending$
  const trigger$ = new Subject<R>();

  const request$ = trigger$
    .mergeMap(param => pending$
      .take(1)
      .filter(v => !v.pending)
      .mapTo(param))
    .share();

  const response$ = request$
    .mergeMap(req => service(req)
      // .takeUntil(trigger$) // should it ? maybe as an option ? (do it with map & switch instead of mergeMap ?)
    )
    .startWith(undefined) // should it startWith ?
    .share();

  const pending$: Observable<{ pending: boolean, since: Date }> = Observable.merge(
    request$.map(isPending),
    response$.map(isNotPending)
  ).startWith(isNotPending()).publishReplay(1).refCount();

  return {
    request$: request$.startWith(null), // should it startWith ?
    pending$,
    response$: response$.startWith(null), // should it startWith ?
    trigger$: new BehaviorSubject((req: R) => trigger$.next(req))
  };
};

export default makeSingleRequester;
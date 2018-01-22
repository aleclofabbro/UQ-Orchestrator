import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { BehaviorSubject } from '@reactivex/rxjs/dist/package/BehaviorSubject';
type PendingObj = {
  pending: boolean;
  since: Date;
};
const getPending = (pending: boolean) => (): PendingObj => ({ pending, since: new Date() });
const isNotPending = getPending(false);
const isPending = getPending(true);
const makeOneShot = <R, S>(
  trigger$: Observable<R>,
  service: (param: R) => Observable<S>
) => {
  const $pending$ = new BehaviorSubject<PendingObj>(isNotPending())
  const request$ = trigger$
    .filter(() => !$pending$.value.pending)
    .publish().refCount();

  const response$ = request$
    .mergeMap(service)
    .publish().refCount();

  Observable.merge(
    request$.map(isPending),
    response$.map(isNotPending)
  ).do(pendingObj => $pending$.next(pendingObj));
  const pending$ = $pending$.asObservable();
  return {
    request$,
    pending$,
    response$
  };
};

export default makeOneShot;
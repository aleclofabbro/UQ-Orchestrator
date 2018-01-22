import { Observable } from '@reactivex/rxjs/dist/package/Rx';
type PendingObj = {
  pending: boolean;
  since: Date;
};

// type MsgPending = {
//   type: 'pending';
//   msg: PendingObj;
// }

// type MsgRequest<T> = {
//   type: 'request';
//   msg: T;
// }

// type MsgResponse<T> = {
//   type: 'response';
//   msg: T;
// }

const getPendingObj = (pending: boolean) => (): PendingObj => ({ pending, since: new Date() });
const isNotPending = getPendingObj(false);
const isPending = getPendingObj(true);
const makeSingleRequester = <R, S>(
  trigger$: Observable<R>,
  service: (param: R) => Observable<S>
) => {
  // type MsgReq = MsgRequest<R>;
  // type MsgRes = MsgResponse<S>;
  const request$ = trigger$
    .mergeMap(param => pending$
      .take(1)
      .filter(v => !v.pending)
      .mapTo(param))
    .startWith(undefined)
    .publish().refCount();

  const response$ = request$
    .mergeMap(service)
    .startWith(undefined)
    .publish().refCount();

  const pending$: Observable<{ pending: boolean, since: Date }> = Observable.merge(
    request$.map(isPending),
    response$.map(isNotPending)
  ).startWith(isNotPending()).publishReplay(1).refCount();

  // return Observable.combineLatest(
  //   request$,
  //   pending$,
  //   response$,
  //   (request, pending, response) => ({request, pending, response})
  // ).publishReplay(1).refCount();
  // return Observable.merge(
  //   request$.map<R, MsgReq>(msg => ({type: 'request', msg})),
  //   pending$.map<PendingObj, MsgPending>(msg => ({type: 'pending', msg})),
  //   response$.map<S, MsgRes>(msg => ({type: 'response', msg}))
  // );
  return {
    request$: request$.startWith(null),
    pending$,
    response$: response$.startWith(null),
  };
};

export default makeSingleRequester;
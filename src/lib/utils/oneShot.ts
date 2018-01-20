import { Observable } from '@reactivex/rxjs/dist/package/Rx';
const makeSingleRequester = <R, S>(
  trigger$: Observable<R>,
  service: (param: R) => Observable<S>
) => {
  const request$ = trigger$
    .mergeMap(param => pending$
      .take(1)
      .filter(v => !v.pending)
      .mapTo(param))
    .publish().refCount();

  const response$ = request$
    .mergeMap(service)
    .publish().refCount();

  const pending$: Observable<{ pending: boolean, since: Date }> = Observable.merge(
    request$.map(() => ({ pending: true, since: new Date() })),
    response$.map(() => ({ pending: false, since: new Date() }))
  ).startWith({ pending: false, since: new Date() }).publishReplay(1).refCount();

  return {
    request$,
    pending$,
    response$
  };
};

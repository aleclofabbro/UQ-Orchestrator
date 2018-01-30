import {
  Observable, BehaviorSubject } from '@reactivex/rxjs/dist/package/Rx';
import { ObservableInput } from '@reactivex/rxjs/dist/package/Observable';

type Options = {
  ignoreWhilePending: boolean
};
const defaultOptions: Options = {
  ignoreWhilePending: true
};

const makeSingleRequester = <R, S>(
  service: (param: R) => ObservableInput<S>,
  request$: Observable<R>,
  options?: Options
) => {
  const opts = {
    ...defaultOptions,
    ...options
  };
  const $pending$ = new BehaviorSubject(false);
  const setPending = (pending: boolean) => () => $pending$.next(pending);
  const shouldRequestGo = () => !$pending$.value || !opts.ignoreWhilePending;
  const response$ = Observable.from(request$)
    // .do<R>(console.log)
    .filter(shouldRequestGo)
    .do<R>(setPending(true))
    .switchMap(service)
    // .do<S>(console.log)
    .share()
    .do<S>(setPending(false));

  return {
    pending$: $pending$.asObservable(),
    response$
  };
};

export default makeSingleRequester;
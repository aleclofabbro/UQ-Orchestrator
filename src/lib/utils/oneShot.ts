import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { BehaviorSubject } from '@reactivex/rxjs/dist/package/BehaviorSubject';
type Options = {
  skipIfPending: boolean
};
const defaultOptions: Options = {
  skipIfPending: true
};

const makeSingleRequester = <R, S>(
  service: (param: R) => Observable<S>,
  request$: Observable<R>,
  options?: Options
) => {
  const opts = {
    ...defaultOptions,
    ...options
  };
  const $pending$ = new BehaviorSubject(false);
  const setPending = (pending: boolean) => () => $pending$.next(pending);
  const shouldRequestGo = () => !opts.skipIfPending || !$pending$.value;
  const response$ = request$
    .do(console.log)
    .filter(shouldRequestGo)
    .do(setPending(true))
    .switchMap(request =>
      service(request)
        .map(response => ({
          request,
          response
        }))
    )
    .do(console.log)
    .share()
    .do(setPending(false));

  return {
    pending$: $pending$.asObservable(),
    response$
  };
};

export default makeSingleRequester;
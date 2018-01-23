// import { ObservableInput } from '@reactivex/rxjs/dist/package/Observable';
import { Observable, Observer } from '@reactivex/rxjs/dist/package/Rx';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const ajax = <T, M>(
  config: AxiosRequestConfig,
  meta?: M
  // mapReject?: (resp: AxiosResponse) => ObservableInput<T>
): Observable<T> => {
  type Response = (AxiosResponse<T> | AxiosError) & { meta: M };
  return Observable.create((observer: Observer<Response>) => {
    // https://github.com/mzabriskie/axios#cancellation
    const _axios = axios.create();
    const cancelSource = axios.CancelToken.source();
    const subscription = Observable.fromPromise(_axios.request<T>({
      ...config,
      cancelToken: cancelSource.token
    }))
      .map(response => ({ ...response, meta }))
      .catch((error: AxiosError) => Observable.of({ ...error, meta }))
      .subscribe(observer);

    return () => {
      cancelSource.cancel('Operation canceled by the user.');
      subscription.unsubscribe();
    };
  });
};

export default ajax;

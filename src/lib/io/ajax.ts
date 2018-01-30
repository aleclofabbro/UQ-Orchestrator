import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { PartialObserver } from '@reactivex/rxjs/dist/package/Observer';
export type Url = string;
export type Method = string;
export type HttpConfig = {
  url: Url;
};
export type HttpGetConfig = HttpConfig & {
  method: 'GET';
};
export type HttpPostConfig = HttpConfig & {
  method: 'POST';
  // tslint:disable-next-line:no-any
  data?: any;
};

const ajax = <T>(
  config: AxiosRequestConfig
): Observable<AxiosResponse<T>> =>
  Observable.create((observer: PartialObserver<AxiosResponse<T>>) => {
    // https://github.com/mzabriskie/axios#cancellation
    const _axios = axios.create();
    const cancelSource = axios.CancelToken.source();
    const subscription =
      Observable.fromPromise(_axios.request<T>({
        ...config,
        cancelToken: cancelSource.token
      }))
        .subscribe(observer);

    return () => {
      cancelSource.cancel('Operation canceled by the user.');
      subscription.unsubscribe();
    };
  });

export default ajax;

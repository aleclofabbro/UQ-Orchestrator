import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { PartialObserver } from '@reactivex/rxjs/dist/package/Observer';

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

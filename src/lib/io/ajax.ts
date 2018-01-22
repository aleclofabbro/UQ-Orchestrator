import { ObservableInput } from '@reactivex/rxjs/dist/package/Observable';
import { Observable, Observer } from '@reactivex/rxjs/dist/package/Rx';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const ajax = <T>(
  config: AxiosRequestConfig,
  mapReject?: (resp: AxiosResponse) => ObservableInput<T>
): Observable<T> => Observable.create((observer: Observer<T>) => {
  // https://github.com/mzabriskie/axios#cancellation
  const _axios = axios.create();
  const cancelSource = axios.CancelToken.source();
  const subscription = Observable.fromPromise(_axios.request<T>({
      ...config,
      cancelToken: cancelSource.token
    }))
    .map(response => response.data)
    .catch(error => mapReject ?
      Observable.from(mapReject(error.response as AxiosResponse)).map(data => ({data})) :
      Observable.empty()
      // Observable.throw(error)
    )
    .subscribe(observer);

  return () => {
    cancelSource.cancel('Operation canceled by the user.');
    subscription.unsubscribe();
  };
});

export default ajax;

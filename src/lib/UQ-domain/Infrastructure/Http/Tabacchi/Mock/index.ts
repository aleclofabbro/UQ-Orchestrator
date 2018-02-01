import * as Api from '../../../../Api/Tabacchi/index';
import { Endpoint } from '../../../../Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export const mine = (endpoint: Endpoint): Api.Mine => () =>
  Observable.of(void 0)
    .delay(1000)
    // tslint:disable-next-line:no-console
    .do(() => console.log('mined', endpoint));

export const recharge = (endpoint: Endpoint): Api.Recharge => () =>
  Observable.of(void 0)
    .delay(1000)
    // tslint:disable-next-line:no-console
    .do(() => console.log('recharged', endpoint));

export default (endpoint: Endpoint) => ({
  mine: mine(endpoint),
  recharge: recharge(endpoint)
});
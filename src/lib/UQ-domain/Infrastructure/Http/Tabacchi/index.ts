// import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import * as Api from '../../../Api/Tabacchi/index';
import * as configs from '../../../Api/Tabacchi/Http/index';
import { Endpoint } from '../../../Data';
import ajax from '../../../../io/ajax';

export const mine = (endpoint: Endpoint): Api.Mine => () =>
  ajax<void>(configs.mine(endpoint))
    .map(response => response.data);
    // .catch(e => Observable.of(void 0));

export const recharge = (endpoint: Endpoint): Api.Recharge => (request) =>
  ajax<void>(configs.recharge(endpoint, request))
    .map(response => response.data);
    // .catch(e => Observable.of(void 0));

export default (endpoint: Endpoint) => ({
  mine: mine(endpoint),
  recharge: recharge(endpoint)
});
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import Api from '../../Api/Tabacchi';
import { Tabacchi as Http } from './Configs';
import { Endpoint } from '../../Data';
import ajax from '../../../io/ajax';

export const mineAjax = (endpoint: Endpoint): Api['mine'] => () =>
  ajax<void>(Http.mine(endpoint))
    .map(response => response.data)
    .catch(e => Observable.of(void 0));

export const rechargeAjax = (endpoint: Endpoint): Api['recharge'] => (request) =>
  ajax<void>(Http.recharge(endpoint, request))
    .map(response => response.data)
    .catch(e => Observable.of(void 0));

export default (endpoint: Endpoint): Api => ({
  mine: mineAjax(endpoint),
  recharge: rechargeAjax(endpoint)
});
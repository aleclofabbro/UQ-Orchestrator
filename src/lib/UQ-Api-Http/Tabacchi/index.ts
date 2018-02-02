// import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import * as Api from 'lib/UQ-Api/Tabacchi';
import * as configs from 'lib/UQ-Api/Tabacchi/Http';
import { Endpoint } from 'lib/UQ-Types-Data';
import ajax from 'lib/io/ajax';

export const mine = (endpoint: Endpoint): Api.Mine =>
  () =>
    ajax<void>(configs.mine(endpoint))
      .map(response => response.data);
// .catch(e => Observable.of(void 0));

export const recharge = (endpoint: Endpoint): Api.Recharge =>
  (request) =>
    ajax<void>(configs.recharge(endpoint, request))
      .map(response => response.data);
// .catch(e => Observable.of(void 0));

export default (endpoint: Endpoint) => ({
  mine: mine(endpoint),
  recharge: recharge(endpoint)
});
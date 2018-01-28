import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Tabacchi as Api } from './../../../lib/UQ-domain/Api';
import { Tabacchi as Http } from './../../../lib/UQ-domain/HttpApi';
import { Endpoint } from './../../../lib/UQ-domain/Data';
import ajax from '../../../lib/io/ajax';

export default (endpoint: Endpoint) => {
  const mineAjax: Api.Mine<Observable<void>> = () =>
    ajax<void>(Http.mine(endpoint))
      .map(response => response.data);

  const rechargeAjax: Api.Recharge<Observable<void>> = (request) =>
    ajax<void>(Http.recharge(endpoint, request))
      .map(response => response.data);

  return {
    mineAjax,
    rechargeAjax,
  };
};
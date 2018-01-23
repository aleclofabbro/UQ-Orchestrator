import { Tabacchi as Api } from './../../../lib/UQ-domain/Api';
import { Tabacchi as Http } from './../../../lib/UQ-domain/HttpApi';
import { Endpoint } from './../../../lib/UQ-domain/Data';
import ajax from '../../../lib/io/ajax';
import endpointUrl from '../../../lib/utils/endpointUrl';

export default (endpoint: Endpoint) => {
  const baseURL = endpointUrl(endpoint);
  const mineAjax: Api.Mine = () => {
    return ajax(
      {
        baseURL,
        ...Http.mine()
      }
    );
  };
  const rechargeAjax: Api.Recharge = (request) => {
    return ajax(
      {
        baseURL,
        ...Http.recharge(request),
      }
    );
  };
  return {
    mineAjax,
    rechargeAjax,
  };
};
import { Endpoint } from './../../../lib/UQ-domain/Data';
import { Tabacchi as Api } from './../../../lib/UQ-domain/Api';
import { Tabacchi as Http } from './../../../lib/UQ-domain/HttpApi';
import endpointUrl from '../../../lib/utils/endpointUrl';
import ajax from '../../../lib/io/ajax';
export default (endpoint: Endpoint) => {
  const baseURL = endpointUrl(endpoint);
  const rechargeAjax: Api.Recharge = (request: Api.RechargeRequest) => {
    return ajax<void | string>(
      {
        baseURL,
        ...Http.recharge(request),
      },
      resp => [`Recharge of ${request.address} failed`]
    );
  };
  return rechargeAjax;
};

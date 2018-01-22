import { Tabacchi as Api } from './../../../lib/UQ-domain/Api';
import { Tabacchi as Http } from './../../../lib/UQ-domain/HttpApi';
import ajax from '../../../lib/io/ajax';
export default (baseURL: string) => {
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

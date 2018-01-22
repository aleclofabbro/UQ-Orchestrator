import { Tabacchi as Api } from './../../../lib/UQ-domain/Api';
import { Tabacchi as Http } from './../../../lib/UQ-domain/HttpApi';
import endpointUrl from '../../../lib/utils/endpointUrl';
import ajax from '../../../lib/io/ajax';
import { Endpoint } from '../../../lib/UQ-domain/Data';
export default (endpoint: Endpoint) => {
  const baseURL = endpointUrl(endpoint);
  const mineAjax: Api.Mine = () => {
    return ajax<void | string>(
      {
        baseURL,
        ...Http.mine(undefined)
      },
      resp => [`Mining request failed`]
    );
  };
  return mineAjax;
};
import { Tabacchi as Api } from './../../../lib/UQ-domain/Api';
import { Tabacchi as Http } from './../../../lib/UQ-domain/HttpApi';
import ajax from '../../../lib/io/ajax';

export default (baseURL: string) => {
  const mineAjax: Api.Mine = () => {
    return ajax<void>(
      {
        baseURL,
        ...Http.mine(undefined)
      }
    );
  };
  return mineAjax;
};
import { Endpoint } from './../../../lib/UQ-domain/Data';
import mine from './mine';
import recharge from './recharge';
import endpointUrl from '../../../lib/utils/endpointUrl';

export default (endpoint: Endpoint) => {
  const baseURL = endpointUrl(endpoint);
  const mineAjax = mine(baseURL);
  const rechargeAjax = recharge(baseURL);
  return {
    mineAjax,
    rechargeAjax,
  };
};
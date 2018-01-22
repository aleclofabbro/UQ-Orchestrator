import { Endpoint } from './../../../lib/UQ-domain/Data';
import mine from './mine';
import recharge from './recharge';

export default (endpoint: Endpoint) => {
  const mineAjax = mine(endpoint);
  const rechargeAjax = recharge(endpoint);
  return {
    mineAjax,
    rechargeAjax,
  };
};
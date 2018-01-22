import { HttpApi } from './HttpApi';
import { Tabacchi as TabacchiApi } from './Api';
export type Url = string;
export type Method = string;
export type HttpApi = {
  url: Url;
};
export type HttpGetApi<R> = (request: R) => HttpApi & {
  method: 'GET';
};
export type HttpPostApi<R, D> = (request: R) => HttpApi & {
  method: 'POST';
  data?: D;
};

// export namespace Imprinter {
//   export const getNodeInfo = () => ({
//     method: 'GET',
//     url: `api/v1/nodeinfo`
//   });
//   export const getNodes = () => ({
//     method: 'GET',
//     url: `api/v1/nodes`
//   });
// }

export namespace Tabacchi {
  export const mine: HttpGetApi<TabacchiApi.MineRequest> = () => ({
    method: 'GET',
    url: `mineshot`
  });
  export type RechargePostData = TabacchiApi.RechargeRequest;

  export const recharge: HttpPostApi<TabacchiApi.RechargeRequest, RechargePostData> =
    ({ address, amount }) => ({
      method: 'POST',
      url: `topup`,
      data: {
        address,
        amount
      }
    });
}

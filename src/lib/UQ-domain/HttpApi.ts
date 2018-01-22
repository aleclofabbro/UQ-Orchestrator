import { HttpApi } from './HttpApi';
import * as Api from './Api';
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

export namespace Imprinter {
  export const getNodeInfo: HttpGetApi<void> = () => ({
    method: 'GET',
    url: `api/v1/nodeinfo`
  });
  export const getNodes: HttpGetApi<void> = () => ({
    method: 'GET',
    url: `api/v1/nodes`
  });
  export const getOrchestrators: HttpGetApi<void> = () => ({
    method: 'GET',
    url: `api/v1/orchestrators`
  });
  export const orchestrate: HttpPostApi<Api.Imprinter.OrchestrateRequest, Api.Imprinter.OrchestrateRequest > =
  ({machine, orchestrator}) => ({
    method: 'POST',
    url: `api/v1/orchestrate`,
    data: {machine, orchestrator}
  });
}

export namespace Tabacchi {
  export const mine: HttpGetApi<Api.Tabacchi.MineRequest> = () => ({
    method: 'GET',
    url: `mineshot`
  });
  export type RechargePostData = Api.Tabacchi.RechargeRequest;

  export const recharge: HttpPostApi<Api.Tabacchi.RechargeRequest, RechargePostData> =
    ({ address, amount }) => ({
      method: 'POST',
      url: `topup`,
      data: {
        address,
        amount
      }
    });
}

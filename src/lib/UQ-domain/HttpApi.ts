import { HttpConfig } from './HttpApi';
import { Xpub } from './Data';
export type Url = string;
export type Method = string;
export type HttpConfig = {
  url: Url;
};
export type HttpGetConfig = HttpConfig & {
  method: 'GET';
};
export type HttpPostConfig<D> = HttpConfig & {
  method: 'POST';
  data?: D;
};

export namespace Imprinter {
  export const getNodeInfo = (): HttpGetConfig => ({
    method: 'GET',
    url: `api/v1/nodeinfo`
  });
  export const getNodes = (): HttpGetConfig => ({
    method: 'GET',
    url: `api/v1/nodes`
  });
  export const getOrchestrators = (): HttpGetConfig => ({
    method: 'GET',
    url: `api/v1/orchestrators`
  });
  export const orchestrate =
    (data: {machine: string, orchestrator: string}): HttpPostConfig<{ machine: Xpub, orchestrator: Xpub }> => ({
      method: 'POST',
      url: `api/v1/orchestrate`,
      data
    });
}

export namespace Tabacchi {
  export const mine = (): HttpGetConfig => ({
    method: 'GET',
    url: `mineshot`
  });

  export const recharge =
    (data: {address: string, amount: number}): HttpPostConfig<{ address: string, amount: number }> => ({
      method: 'POST',
      url: `topup`,
      data
    });
}

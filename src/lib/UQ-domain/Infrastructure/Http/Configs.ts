import { Xpub, Endpoint } from '../../Data';
import epUrl from '../../../utils/endpointUrl';

export type Url = string;
export type Method = string;
export type HttpConfig = {
  url: Url;
};
export type HttpGetConfig = HttpConfig & {
  method: 'GET';
};
export type HttpPostConfig = HttpConfig & {
  method: 'POST';
  // tslint:disable-next-line:no-any
  body?: any;
};
export namespace Imprinter {
  export const getNodeInfo = (ep: Endpoint): HttpGetConfig => ({
    method: 'GET',
    url: `${epUrl(ep)}/api/v1/nodeinfo`
  });
  export const getNodes = (ep: Endpoint): HttpGetConfig => ({
    method: 'GET',
    url: `${epUrl(ep)}/api/v1/nodes`
  });
  export const getOrchestrators = (ep: Endpoint): HttpGetConfig => ({
    method: 'GET',
    url: `${epUrl(ep)}/api/v1/orchestrators`
  });
  export const orchestrate = (ep: Endpoint, body: {
    machine: Xpub,
    orchestrator: Xpub
  }): HttpPostConfig =>
    ({
      method: 'POST',
      url: `${epUrl(ep)}/api/v1/orchestrate`,
      body
    });
}

export namespace Tabacchi {
  export const mine = (ep: Endpoint): HttpGetConfig => ({
    method: 'GET',
    url: `${epUrl(ep)}/mineshot`
  });

  export const recharge = (ep: Endpoint, body: {
    address: string,
    amount: number
  }): HttpPostConfig =>
    ({
      method: 'POST',
      url: `${epUrl(ep)}/topup`,
      body
    });
}

import { HttpPostConfig, HttpGetConfig } from '../../../../io/ajax';
import { Xpub, Endpoint } from '../../../Data';
import epUrl from '../../../../utils/endpointUrl';

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
export const orchestrate = (ep: Endpoint, data: {
  machine: Xpub,
  orchestrator: Xpub
}): HttpPostConfig =>
  ({
    method: 'POST',
    url: `${epUrl(ep)}/api/v1/orchestrate`,
    data
  });

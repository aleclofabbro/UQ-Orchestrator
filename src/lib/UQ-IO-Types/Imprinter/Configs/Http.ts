import { HttpPostConfig, HttpGetConfig } from 'lib/io/ajax';
import { Xpub, Endpoint } from 'lib/UQ-Data-Types';
import { endpointUrl } from 'lib/utils/endpointUrl';

export const getNodeInfo = (ep: Endpoint): HttpGetConfig => ({
  method: 'GET',
  url: `${endpointUrl(ep)}/api/v1/nodeinfo`
});
export const getNodes = (ep: Endpoint): HttpGetConfig => ({
  method: 'GET',
  url: `${endpointUrl(ep)}/api/v1/nodes`
});
export const getOrchestrators = (ep: Endpoint): HttpGetConfig => ({
  method: 'GET',
  url: `${endpointUrl(ep)}/api/v1/orchestrators`
});
export const orchestrate = (ep: Endpoint, data: {
  machine: Xpub,
  orchestrator: Xpub
}): HttpPostConfig =>
  ({
    method: 'POST',
    url: `${endpointUrl(ep)}/api/v1/orchestrate`,
    data
  });

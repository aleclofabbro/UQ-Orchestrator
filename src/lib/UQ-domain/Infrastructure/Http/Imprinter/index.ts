import { Imprinter as Api } from '../../../Api/tabacchi';
import { Imprinter as Http } from '../../../HttpApi';
import { Endpoint, Wallet, OrchestratorNode, Node } from '../../../Data';
import ajax from '../../../../io/ajax';

export const getNodeInfo = (endpoint: Endpoint): Api.GetNodeInfo => () => {
  return ajax<Wallet>(Http.getNodeInfo(endpoint))
    .map(response => response.data);
};

export const getNodes = (endpoint: Endpoint): Api.GetNodes => () => {
  return ajax<Node[]>(Http.getNodes(endpoint))
    .map(response => response.data);
};

export const getOrchestrators = (endpoint: Endpoint): Api.GetOrchestrators => () => {
  return ajax<OrchestratorNode[]>(Http.getOrchestrators(endpoint))
    .map(response => response.data);
};

export const orchestrate = (endpoint: Endpoint): Api.Orchestrate => (request) => {
  return ajax<void>(Http.orchestrate(endpoint, request))
    .map(response => response.data);
};

export default (endpoint: Endpoint) => ({
  getNodeInfo: getNodeInfo(endpoint),
  getNodes: getNodes(endpoint),
  getOrchestrators: getOrchestrators(endpoint),
  orchestrate: orchestrate(endpoint)
});
import { Imprinter as Api } from 'lib/UQ-IO-Types/Imprinter';
import * as configs from 'lib/UQ-IO-Types/Imprinter/Http';
import { Endpoint, Wallet, OrchestratorNode, Node } from 'lib/UQ-Data-Types';
import ajax from 'lib/io/ajax';

export const getNodeInfo = (endpoint: Endpoint): Api.GetNodeInfo =>
  () => {
    return ajax<Wallet>(configs.getNodeInfo(endpoint))
      .map(response => response.data);
  };

export const getNodes = (endpoint: Endpoint): Api.GetNodes =>
  () => {
    return ajax<Node[]>(configs.getNodes(endpoint))
      .map(response => response.data);
  };

export const getOrchestrators = (endpoint: Endpoint): Api.GetOrchestrators =>
  () => {
    return ajax<OrchestratorNode[]>(configs.getOrchestrators(endpoint))
      .map(response => response.data);
  };

export const orchestrate = (endpoint: Endpoint): Api.Orchestrate =>
  (request) => {
    return ajax<void>(configs.orchestrate(endpoint, request))
      .map(response => response.data);
  };

export default (endpoint: Endpoint) => ({
  getNodeInfo: getNodeInfo(endpoint),
  getNodes: getNodes(endpoint),
  getOrchestrators: getOrchestrators(endpoint),
  orchestrate: orchestrate(endpoint)
});
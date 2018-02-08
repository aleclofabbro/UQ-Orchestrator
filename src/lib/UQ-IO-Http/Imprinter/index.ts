import {
  Api,
  GetNodeInfo,
  GetOrchestrators,
  GetNodes,
  Orchestrate
} from 'lib/UQ-IO-Types/Imprinter';
import * as configs from 'lib/UQ-IO-Types/Imprinter/Http';
import { Endpoint, Wallet, OrchestratorNode, Node } from 'lib/UQ-Data-Types';
import { ajax } from 'lib/io/ajax';

export const getNodeInfo = (endpoint: Endpoint): GetNodeInfo =>
  () => {
    return ajax<Wallet>(configs.getNodeInfo(endpoint))
      .map(response => response.data);
  };

export const getNodes = (endpoint: Endpoint): GetNodes =>
  () => {
    return ajax<Node[]>(configs.getNodes(endpoint))
      .map(response => response.data);
  };

export const getOrchestrators = (endpoint: Endpoint): GetOrchestrators =>
  () => {
    return ajax<OrchestratorNode[]>(configs.getOrchestrators(endpoint))
      .map(response => response.data);
  };

export const orchestrate = (endpoint: Endpoint): Orchestrate =>
  (request) => {
    return ajax<void>(configs.orchestrate(endpoint, request))
      .map(response => response.data);
  };

export const HttpApi = (endpoint: Endpoint): Api => ({
  getNodeInfo: getNodeInfo(endpoint),
  getNodes: getNodes(endpoint),
  getOrchestrators: getOrchestrators(endpoint),
  orchestrate: orchestrate(endpoint)
});
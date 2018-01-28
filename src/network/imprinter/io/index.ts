import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Imprinter as Api } from './../../../lib/UQ-domain/Api';
import { Imprinter as Http } from './../../../lib/UQ-domain/HttpApi';
import { Endpoint, Wallet, OrchestratorNode, Node } from './../../../lib/UQ-domain/Data';
import ajax from '../../../lib/io/ajax';

export default (endpoint: Endpoint) => {
  const getNodeInfo: Api.GetNodeInfo<Observable<Wallet>> = () => {
    return ajax<Wallet>(Http.getNodeInfo(endpoint))
      .map(response => response.data);
  };

  const getNodes: Api.GetNodes<Observable<Node[]>> = () => {
    return ajax<Node[]>(Http.getNodes(endpoint))
      .map(response => response.data);
  };

  const getOrchestrators: Api.GetOrchestrators<Observable<OrchestratorNode[]>> = () => {
    return ajax<OrchestratorNode[]>(Http.getOrchestrators(endpoint))
      .map(response => response.data);
  };

  const orchestrate: Api.Orchestrate<Observable<void>> = (request) => {
    return ajax<void>(Http.orchestrate(endpoint, request))
      .map(response => response.data);
  };

  return {
    getNodeInfo,
    getNodes,
    getOrchestrators,
    orchestrate
  };
};
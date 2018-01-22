import { OrchestratorNode, Node } from './../../../lib/UQ-domain/Data';
import { Imprinter as Api } from './../../../lib/UQ-domain/Api';
import { Imprinter as Http } from './../../../lib/UQ-domain/HttpApi';
import ajax from '../../../lib/io/ajax';
import { Wallet } from '../../../lib/UQ-domain/Data';

export default (baseURL: string) => {

  const getNodeInfo: Api.GetNodeInfo = () => {
    return ajax<Wallet>(
      {
        baseURL,
        ...Http.getNodeInfo(undefined)
      }
    );
  };

  const getNodes: Api.GetNodes = () => {
    return ajax<Node[]>(
      {
        baseURL,
        ...Http.getNodes(undefined)
      }
    );
  };

  const getOrchestrators: Api.GetOrchestrators = () => {
    return ajax<OrchestratorNode[]>(
      {
        baseURL,
        ...Http.getOrchestrators(undefined)
      }
    );
  };

  const orchestrate: Api.Orchestrate = ({machine, orchestrator}) => {
    return ajax<void>(
      {
        baseURL,
        ...Http.orchestrate({machine, orchestrator})
      }
    );
  };

  return {
    getNodeInfo,
    getNodes,
    getOrchestrators,
    orchestrate
  };
};
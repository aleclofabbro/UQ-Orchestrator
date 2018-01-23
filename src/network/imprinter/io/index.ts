import { Imprinter as Api } from './../../../lib/UQ-domain/Api';
import { Imprinter as Http } from './../../../lib/UQ-domain/HttpApi';
import { Endpoint } from './../../../lib/UQ-domain/Data';
import ajax from '../../../lib/io/ajax';
import endpointUrl from '../../../lib/utils/endpointUrl';

export default (endpoint: Endpoint) => {
  const baseURL = endpointUrl(endpoint);
  const getNodeInfo: Api.GetNodeInfo = () => {
    return ajax(
      {
        baseURL,
        ...Http.getNodeInfo()
      }
    );
  };

  const getNodes: Api.GetNodes = () => {
    return ajax(
      {
        baseURL,
        ...Http.getNodes()
      }
    );
  };

  const getOrchestrators: Api.GetOrchestrators = () => {
    return ajax(
      {
        baseURL,
        ...Http.getOrchestrators()
      }
    );
  };

  const orchestrate: Api.Orchestrate = (request) => {
    return ajax<void>(
      {
        baseURL,
        ...Http.orchestrate(request)
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
import IO from './io';
import { Endpoint, Node } from '../../lib/UQ-domain/Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import endpointUrl from '../../lib/utils/endpointUrl';
import { Imprinter } from '../../lib/UQ-domain/Api';

type NodesFromImprinter = {
  [xpub: string]: Node
};

export const pollInterval = 10000;

export const mergeNodes = (mergeTo: NodesFromImprinter, otherNodes: Node[]) => otherNodes.reduce(
  (acc, node) => ({
    ...acc,
    [node.xpub]: {
      ...acc[node.xpub],
      ...node
    }
  }), mergeTo);

export default (imprinterEndpoint: Endpoint) => {
  const baseURL = endpointUrl(imprinterEndpoint);
  const io = IO(baseURL);

  const imprinterInfo$ = io.getNodeInfo(undefined)
    .repeatWhen(() => Observable.interval(pollInterval));

  const orchestrators$ = io.getOrchestrators(undefined)
    .repeatWhen(() => Observable.interval(pollInterval));

  const imprinterNodes$: Observable<NodesFromImprinter> = io.getNodes(undefined)
    .repeatWhen(() => Observable.interval(pollInterval))
    .scan(mergeNodes, ({} as NodesFromImprinter));

  const orchestrate = (req: Imprinter.OrchestrateRequest) => io.orchestrate(req)
    .subscribe();


  return Observable.combineLatest(
    orchestrators$,
    imprinterNodes$,
    imprinterInfo$,
    (
      orchestrators,
      nodes,
      info
    ) => ({
      orchestrate,
      orchestrators,
      nodes,
      info
    })
  );
};
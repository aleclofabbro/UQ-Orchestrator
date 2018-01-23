import IO from './io';
import { Endpoint, Node } from '../../lib/UQ-domain/Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

type NodesFromImprinter = {
  [xpub: string]: Node
};

export const pollInterval = 10000;

export const mergeNodes = (mergeTo: NodesFromImprinter, otherNodes: Node[]) =>
  otherNodes.reduce(
    (acc, node) => ({
      ...acc,
      [node.xpub]: {
        ...acc[node.xpub],
        ...node
      }
    }),
    mergeTo);

export default (imprinterEndpoint: Endpoint) => {
  const io = IO(imprinterEndpoint);

  const imprinterInfo$ = io.getNodeInfo()
    .repeatWhen(() => Observable.interval(pollInterval));

  const orchestrators$ = io.getOrchestrators()
    .repeatWhen(() => Observable.interval(pollInterval));

  const imprinterNodes$ = io.getNodes()
    .repeatWhen(() => Observable.interval(pollInterval))
    .scan(mergeNodes, ({} as NodesFromImprinter));

  const orchestrate = (req: {orchestrator: string, machine: string}) => io.orchestrate(req)
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
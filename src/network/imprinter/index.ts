import { Node } from '../../lib/UQ-domain/Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { BehaviorSubject } from '@reactivex/rxjs/dist/package/BehaviorSubject';

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

export default (endpoint: Endpoint) => {

  const imprinterInfo$ = Observable.from(getNodeInfo(endpoint)())
    .repeatWhen(() => Observable.interval(pollInterval));

  const orchestrators$ = Observable.from(getOrchestrators(endpoint)())
    .repeatWhen(() => Observable.interval(pollInterval));

  const imprinterNodes$ = Observable.from(getNodes(endpoint)())
    .repeatWhen(() => Observable.interval(pollInterval))
    .scan(mergeNodes, ({}));

  const orchestrate$ = new BehaviorSubject(
    (req: { orchestrator: string, machine: string }) => Observable.from(orchestrate(endpoint)(req)));

  return {
    orchestrators$,
    imprinterNodes$,
    imprinterInfo$,
    orchestrate$
  };
};
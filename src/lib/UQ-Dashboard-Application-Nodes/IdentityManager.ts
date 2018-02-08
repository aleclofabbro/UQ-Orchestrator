import { OrchestratorNode, Node } from './../UQ-Data-Types/index';
import { Observable } from '@reactivex/rxjs';
import { Scheduler } from '@reactivex/rxjs/dist/package/Scheduler';
import { Api, OrchestrateRequest } from 'lib/UQ-IO-Types/Imprinter';
import { PartialObserver } from '@reactivex/rxjs/dist/package/Observer';
import { Wallet } from 'lib/UQ-Data-Types';

interface Config {
  api$: Observable<Api>;
  getNodesReq$: Observable<void>;
  orchestrateReq$: Observable<OrchestrateRequest>;
  $orchestrateRes: PartialObserver<OrchestrateRequest>;
  scheduler?: Scheduler;
  interval: number;
}
interface State {
  nodes: Node[];
  nodeInfo: Wallet | null;
  orchestrators: OrchestratorNode[];
}
export const IdentityManager = ({
  scheduler,
  api$,
  getNodesReq$,
  orchestrateReq$,
  $orchestrateRes,
  interval = 10000
}: Config): Observable<State> => {
  const nodes$ = api$.mergeMap(
    api => getNodesReq$
      .startWith(null)
      .mergeMap(() => api.getNodes()
        .repeatWhen(notifications => notifications.delay(interval, scheduler))
      )
  );

  const nodeInfo$ = api$.mergeMap(
    api => api.getNodeInfo()
      .repeatWhen(notifications => notifications.delay(interval, scheduler))
  );

  const orchestrators$ = api$.mergeMap(
    api => api.getOrchestrators()
      .repeatWhen(notifications => notifications.delay(interval, scheduler))
  );

  const orchestrateQueue$ = api$.mergeMap(
    api => orchestrateReq$
      .map(req => api.orchestrate(req)
        .mapTo(req)
        .do($orchestrateRes)
      )
      .concatAll()
  );

  return Observable.combineLatest(
    nodes$,
    nodeInfo$,
    orchestrators$,
    orchestrateQueue$,
    (
      nodes,
      nodeInfo,
      orchestrators
      // orchestrateQueue
    ) => ({
      nodes,
      nodeInfo,
      orchestrators
      // orchestrateQueue
    })
  );
};
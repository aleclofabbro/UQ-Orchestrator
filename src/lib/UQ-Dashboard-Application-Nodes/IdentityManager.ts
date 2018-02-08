import { Observable } from '@reactivex/rxjs';
import { Scheduler } from '@reactivex/rxjs/dist/package/Scheduler';
import { Api, OrchestrateRequest } from 'lib/UQ-IO-Types/Imprinter';
import { PartialObserver } from '@reactivex/rxjs/dist/package/Observer';

type Config = {
  api$: Observable<Api>;
  getNodesReq$: Observable<void>;
  orchestrateReq$: Observable<OrchestrateRequest>;
  $orchestrateRes: PartialObserver<OrchestrateRequest>;
  scheduler?: Scheduler;
  interval: number;
}
export const IdentityManager = ({
  scheduler,
  api$,
  getNodesReq$,
  orchestrateReq$,
  $orchestrateRes,
  interval = 10000
}: Config) => {
  const nodes$ = api$.mergeMap(
    api => getNodesReq$
      .startWith(null)
      .switchMapTo(Observable.interval(interval, scheduler).startWith(-1))
      .mergeMap(api.getNodes)
  );

  const nodeInfo$ = api$.mergeMap(
    api => Observable.interval(interval, scheduler)
      .mergeMap(api.getNodeInfo)
  );

  const orchestrators$ = api$.mergeMap(
    api => Observable.interval(interval, scheduler)
      .mergeMap(api.getOrchestrators)
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
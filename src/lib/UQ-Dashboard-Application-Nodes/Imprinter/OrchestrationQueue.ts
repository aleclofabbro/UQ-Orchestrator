import { Observable } from '@reactivex/rxjs';
import { OrchestrateRequest, Orchestrate } from 'lib/UQ-IO-Types/Imprinter';
import { PartialObserver } from '@reactivex/rxjs/dist/package/Observer';

interface Config {
  api$: Observable<Orchestrate>;
  enqueueRequest$: Observable<OrchestrateRequest>;
  $response: PartialObserver<OrchestrateRequest>;
  $requestIssued: PartialObserver<OrchestrateRequest>;
}
export const OrchestrationQueue = ({
  api$,
  enqueueRequest$,
  $response,
  $requestIssued,
}: Config): Observable<OrchestrateRequest> => api$.mergeMap(
    api => enqueueRequest$
      .map(req => api(req)
        .mapTo(req)
        .do($response)
        .startWith(req)
        .do($requestIssued)
      )
      .concatAll()
  );

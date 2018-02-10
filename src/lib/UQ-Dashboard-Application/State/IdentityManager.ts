import { OrchestrateRequest } from 'lib/UQ-IO-Types/Imprinter';
import { Node, Wallet, OrchestratorNode, Xpub } from 'lib/UQ-Data-Types';
import { Observable } from '@reactivex/rxjs';

interface Config {
  wallet$: Observable<Wallet>;
  orchestrators$: Observable<OrchestratorNode[]>;
  nodes$: Observable<Node[]>;
  selectedNodes$: Observable<Xpub[]>;
  selectedOrchestrator$: Observable<Xpub>;
  toggleSelectNode: Observable<Xpub>;
  pendingEnrollRequest$: Observable<OrchestrateRequest>;
  enrollResponse$: Observable<OrchestrateRequest>;
}
export const IdManagerState = ({
  wallet$,
  orchestrators$,
  nodes$,
  selectedNodes$,
  selectedOrchestrator$,
  pendingEnrollRequest$,
  enrollResponse$
}: Config) => Observable.combineLatest(
    wallet$,
    orchestrators$,
    nodes$,
    selectedNodes$,
    selectedOrchestrator$,
    pendingEnrollRequest$,
    enrollResponse$,
    (
      wallet,
      orchestrators,
      nodes,
      selectedNodes,
      selectedOrchestrator,
      pendingEnrollRequest,
      enrollResponse
    ) => ({
      wallet,
      orchestrators,
      nodes,
      selectedNodes,
      selectedOrchestrator,
      pendingEnrollRequest,
      enrollResponse
      })
    );
    // .startWith(init || defaultState);

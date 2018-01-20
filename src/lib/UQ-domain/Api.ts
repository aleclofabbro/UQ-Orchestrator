import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { ImprinterNode, Wallet, OrchestratorNode, Contract, Xpub } from './Data';
export type API<R, V> = (Request: R) => Observable<V>;
export namespace Imprinter {
  export type GetNodeInfo = API<void, Wallet | string>;
  export type GetOrchestrators = API<void, OrchestratorNode[] | string>;
  export type GetNodes = API<void, ImprinterNode[] | string>;
  export type Orchestrate = API<{ orchestrator: Xpub, machine: Xpub }, void | string>;
}

export namespace Orchestrator {
  export type Nodes = API<void, OrchestratorNode[] | string>;
  export type GetContracts = API<void, Contract[] | string>;
  export type NewContract = API<Contract, void | string>;
  export type DeleteContract = API<{ txid: string }, void | string>;
}

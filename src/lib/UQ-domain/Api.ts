import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Node, Wallet, OrchestratorNode, Contract, Xpub } from './Data';
export type API<R, V> = (Request: R) => Observable<V>;
export namespace Imprinter {
  export type GetNodeInfo = API<void, Wallet>;
  export type GetOrchestrators = API<void, OrchestratorNode[]>;
  export type GetNodes = API<void, Node[]>;
  export type OrchestrateRequest = { orchestrator: Xpub, machine: Xpub };
  export type Orchestrate = API<OrchestrateRequest, void>;
}

export namespace Orchestrator {
  export type GetNodes = API<void, OrchestratorNode[]>;
  export type GetContracts = API<void, Contract[]>;
  export type NewContract = API<Contract, void>;
  export type DeleteContract = API<{ txid: string }, void>;
}

export namespace Tabacchi {
  export type RechargeRequest = {
    address: string;
    amount: number;
  };
  export type Recharge = API<RechargeRequest, void>;

  export type MineRequest = void;
  export type Mine = API<MineRequest, void>;
}

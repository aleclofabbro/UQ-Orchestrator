import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { Node, Wallet, OrchestratorNode, Xpub /*, Contract*/ } from './Data';

// vorrei : type Orchestrate<Holder> = (address: string, amount: number) => Holder<void>;
// ma HKT not supported..
// https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe
// https://stackoverflow.com/a/37323987/1455910
// Quindi elenco semplicemente request e response per e Api

export namespace Imprinter {
  export type GetNodeInfo = () => Observable<Wallet>;
  export type GetOrchestrators = () => Observable<OrchestratorNode[]>;
  export type GetNodes = () => Observable<Node[]>;
  export type Orchestrate = (request: {orchestrator: Xpub, machine: Xpub}) => Observable<void>;
};

// Orchestrator {
//   GetNodes : void, OrchestratorNode[]
//   GetContracts : void, Contract[]
//   NewContract : Contract, void
//   DeleteContract : { txid: string }, void
// }

export namespace Tabacchi {
  export type Recharge = (request: {address: string, amount: number}) => Observable<void>;
  export type Mine = () => Observable<void>;
}

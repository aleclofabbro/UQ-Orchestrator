import { Node, Wallet, OrchestratorNode, Xpub /*, Contract*/ } from './Data';
import { ObservableInput } from '@reactivex/rxjs/dist/package/Observable';

// vorrei : type Orchestrate<Holder> = (address: string, amount: number) => Holder<void>;
// ma HKT not supported..
// https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe
// https://stackoverflow.com/a/37323987/1455910
// Quindi elenco semplicemente request e response per e Api

export namespace Imprinter {
  export type GetNodeInfo<H extends ObservableInput<Wallet>> = () => H;
  export type GetOrchestrators<H extends ObservableInput<OrchestratorNode[]>> = () => H;
  export type GetNodes<H extends ObservableInput<Node[]>> = () => H;
  export type OrchestrateRequest = {orchestrator: Xpub; machine: Xpub;};
  export type Orchestrate<H extends ObservableInput<void>> = (request: OrchestrateRequest) => H;
};

// Orchestrator {
//   GetNodes : void, OrchestratorNode[]
//   GetContracts : void, Contract[]
//   NewContract : Contract, void
//   DeleteContract : { txid: string }, void
// }

export namespace Tabacchi {
  export type RechargeRequest = {address: string; amount: number;};
  export type Recharge<H extends ObservableInput<void>> = (request: RechargeRequest) => H;
  export type Mine<H extends ObservableInput<void>> = () => H;
}

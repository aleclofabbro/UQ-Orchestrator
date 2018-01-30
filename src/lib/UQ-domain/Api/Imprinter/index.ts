import { Node, Wallet, OrchestratorNode, Xpub /*, Contract*/ } from '../../Data';
import { ObservableInput } from '@reactivex/rxjs/dist/package/Observable';

// vorrei : type Orchestrate<Holder> = (address: string, amount: number) => Holder<void>;
// ma HKT not supported..
// https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe
// https://stackoverflow.com/a/37323987/1455910
// Quindi qui imposto che l'holder del value del'Api sarà un ObservableInput

export namespace Imprinter {

  export type GetNodeInfo = () => ObservableInput<Wallet>;

  export type GetOrchestrators = () => ObservableInput<OrchestratorNode[]>;

  export type GetNodes = () => ObservableInput<Node[]>;

  export type OrchestrateRequest = { orchestrator: Xpub; machine: Xpub; };
  export type Orchestrate = (request: OrchestrateRequest) => ObservableInput<void>;

}

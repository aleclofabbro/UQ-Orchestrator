import { Node, Wallet, OrchestratorNode, Xpub /*, Contract*/ } from 'lib/UQ-Data-Types';
import { Observable } from '@reactivex/rxjs';

// // vorrei : type Orchestrate<Holder> = (address: string, amount: number) => Holder<void>;
// // ma HKT not supported..
// // https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe
// // https://stackoverflow.com/a/37323987/1455910
// // Quindi qui imposto che l'holder del value del'Api sarà un Observable

export type GetNodeInfo = () => Observable<Wallet>;

export type GetOrchestrators = () => Observable<OrchestratorNode[]>;

export type GetNodes = () => Observable<Node[]>;

export type OrchestrateRequest = { orchestrator: Xpub; machine: Xpub; };
export type Orchestrate = (request: OrchestrateRequest) => Observable<void>;

export type Api = {
  getNodeInfo: GetNodeInfo;
  getOrchestrators: GetOrchestrators;
  getNodes: GetNodes;
  orchestrate: Orchestrate;
};
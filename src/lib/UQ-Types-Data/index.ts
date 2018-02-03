export type NodeStatus = 'CREATED' |'IMPRINTING' |'IMPRINTED' |'ORCHESTRATING' |'ORCHESTRATED' ;

export type SessionId = string;

export interface Wallet {
  providerBalance: number;
  name: string;
  userBalance: number;
}

// export type Protocol = 'http' | 'https' | 'ws';
export interface Endpoint {
  ip: string;
  protocol: string;
  port?: string | number;
}

export type Xpub = string;

export interface BaseNode {
  name: string;
  xpub: Xpub;
}

export interface Node extends BaseNode {
  born: string;
  status: NodeStatus;
}

export interface NodeWithWallet extends BaseNode {
  wallet: Wallet;
}
export interface ImprinterNode extends BaseNode {
  imprinter: Endpoint;
}
export interface OrchestratorNode extends BaseNode {
  orchestrator: Endpoint;
}

export interface Contract {
  txid?: string;
  user: Node;
  provider: Node;
  functions: number[];
}

export interface Config {
    legatus: Endpoint;
}
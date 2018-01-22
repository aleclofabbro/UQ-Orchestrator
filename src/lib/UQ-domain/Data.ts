export enum NodeStatus {
 CREATED = 'CREATED',
 IMPRINTING = 'IMPRINTING',
 IMPRINTED = 'IMPRINTED',
 ORCHESTRATING = 'ORCHESTRATING',
 ORCHESTRATED = 'ORCHESTRATED'
}

export type Wallet = {
  providerBalance: number;
  name: string;
  userBalance: number;
};

export type Protocol = 'http' | 'https' | 'ws';
export type Endpoint = {
  ip: string;
  protocol: Protocol;
  port: string | number;
};

export type Xpub = string;

export type BaseNode = {
  name: string;
  xpub: Xpub;
};

export type Node = BaseNode & {
  born: string;
  status: NodeStatus;
};

export type NodeWithWallet = BaseNode & { wallet: Wallet };
export type ImprinterNode = BaseNode & { imprinter: Endpoint };
export type OrchestratorNode = BaseNode & { orchestrator: Endpoint };

export type Contract = {
  txid?: string;
  user: Node;
  provider: Node;
  functions: number[];
};

export type Config = {
    defaultImprinter: Endpoint,
    legatus: Endpoint,
    tabacchi: Endpoint
};
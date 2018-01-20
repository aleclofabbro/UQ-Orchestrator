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

export type Protocol = 'http' | 'https';
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

export type NodeWithWallet = Node & { wallet: Wallet }
export type ImprinterNode = NodeWithWallet & { imprinter: Endpoint }
export type OrchestratorNode = Node & { orchestrator: Endpoint }

export type Contract = {
  txid?: string;
  user: Node;
  provider: Node;
  functions: number[];
};

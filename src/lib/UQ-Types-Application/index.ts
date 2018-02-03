import { ConnectedUser } from 'lib/UQ-Types-Application';
import { SessionId, OrchestratorNode } from 'lib/UQ-Types-Data';
export interface WithSessionId {
  sessionId: SessionId;
}

export type ConnectedUser = OrchestratorNode & WithSessionId;
export type DisconnectedUser = WithSessionId;

export type User = DisconnectedUser | ConnectedUser;

export const isConnectedUser = (user: User): user is ConnectedUser => !!(user as ConnectedUser).xpub;
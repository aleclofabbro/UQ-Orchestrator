import { SessionId, OrchestratorUser, OrchestratorConfig } from 'lib/UQ-Data-Types';

export type ConnectedUser = OrchestratorUser;
export interface DisconnectedUser {
  sessionId: SessionId;
}

export type User = DisconnectedUser | ConnectedUser;

export const isConnectedUser = (user: User): user is ConnectedUser => !!(user as ConnectedUser).xpub;

export interface Config {
  orchestratorConfig: OrchestratorConfig;
}
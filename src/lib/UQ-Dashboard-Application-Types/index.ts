import { Endpoint } from '../UQ-Data-Types/index';
import { SessionId, OrchestratorUser } from 'lib/UQ-Data-Types';

export type ConnectedUser = OrchestratorUser;
export type DisconnectedUser = {
  sessionId: SessionId;
};

export type User = DisconnectedUser | ConnectedUser;

export const isConnectedUser = (user: User): user is ConnectedUser => !!(user as ConnectedUser).xpub;

export interface Config {
  legatus: Endpoint;
}
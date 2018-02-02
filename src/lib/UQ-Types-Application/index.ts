import { SessionId, OrchestratorNode } from 'src/lib/UQ-Types-Data';
export interface User extends OrchestratorNode {
  sessionId: SessionId;
}
export interface UserSession {
  user: User | null;
}
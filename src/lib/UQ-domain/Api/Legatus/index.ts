import { SessionId, OrchestratorNode } from './../../Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export type AnnounceSessionIdPayload = SessionId;
export type AnnounceSessionIdResponseValue = OrchestratorNode & { sessionId: SessionId };

export type AnnounceSessionId = (request: AnnounceSessionIdPayload) =>
  Observable<AnnounceSessionIdResponseValue>;

import { OrchestratorUser } from '../../UQ-Data-Types/index';
import { SessionId } from 'lib/UQ-Data-Types';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export type AnnounceSessionId =
  (request: SessionId) => Observable<OrchestratorUser>;

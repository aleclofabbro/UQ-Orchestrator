import { UserSession } from 'src/lib/UQ-Types-Application/index';
import { SessionId } from 'src/lib/UQ-Types-Data/index';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export type AnnounceSessionIdPayload = SessionId;

export type AnnounceSessionId = (request: AnnounceSessionIdPayload) =>
  Observable<UserSession>;

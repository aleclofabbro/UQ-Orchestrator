import { ConnectedUser } from 'lib/UQ-Types-Application';
import { SessionId } from 'lib/UQ-Types-Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export type AnnounceSessionId =
  (request: SessionId) => Observable<ConnectedUser>;

import { UserSession } from 'src/lib/UQ-Types-Application/index';
import { SessionId } from 'src/lib/UQ-Types-Data/index';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export type AnnounceSessionId =
  (request: SessionId) => Observable<UserSession>;

import { User } from 'src/lib/UQ-Types-Application';
import { SessionId } from 'src/lib/UQ-Types-Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export type AnnounceSessionId =
  (request: SessionId) => Observable<User>;

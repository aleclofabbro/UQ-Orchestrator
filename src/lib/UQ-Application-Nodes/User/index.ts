import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { AnnounceSessionId } from 'lib/UQ-Types-IO/Legatus';
import { SessionId } from 'lib/UQ-Types-Data';
import { User } from 'lib/UQ-Types-Application';

export const userSessionNode = (
  announceSessionIdRequest$: Observable<SessionId>,
  announceSessionId$: Observable<AnnounceSessionId>
): Observable<User> => announceSessionId$.switchMap(
  io => announceSessionIdRequest$.mergeMap(sessionId =>
    io(sessionId)
      .startWith({sessionId})
  )
);

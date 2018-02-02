import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { AnnounceSessionId } from 'lib/UQ-Api/Legatus';
import { SessionId } from 'lib/UQ-Types-Data';
import { UserSession } from 'lib/UQ-Types-Application';

export const userSessionNode = (
  announceSessionIdRequest$: Observable<SessionId>,
  announceSessionId$: Observable<AnnounceSessionId>
): Observable<UserSession> => announceSessionId$.switchMap(
  io => announceSessionIdRequest$.mergeMap(payload =>
    io(payload)
      .startWith(null)
      .map(user => ({ user }))
  )
);

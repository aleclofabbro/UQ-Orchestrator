import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { AnnounceSessionId } from 'src/lib/UQ-Api/Legatus';
import { SessionId } from 'src/lib/UQ-Types-Data';
import { UserSession } from 'src/lib/UQ-Types-Application/index';

export const user$fact = (
  announceSessionIdRequest$: Observable<SessionId>,
  announceSessionId$: Observable<AnnounceSessionId>
): Observable<UserSession> => announceSessionId$.switchMap(
  io => announceSessionIdRequest$.mergeMap(payload =>
    io(payload)
      .startWith(null)
      .map(user => ({ user }))
  )
);

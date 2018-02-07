import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { AnnounceSessionId } from 'lib/UQ-IO-Types/Legatus';
import { SessionId } from 'lib/UQ-Data-Types';
import { User } from 'lib/UQ-Dashboard-Application-Types';

interface Config {
  announceSessionIdRequest$: Observable<SessionId>;
  announceSessionId$: Observable<AnnounceSessionId>;
}
export const userSessionNode = ({
  announceSessionIdRequest$,
  announceSessionId$
}: Config): Observable<User> => announceSessionId$.switchMap(
  io => announceSessionIdRequest$.mergeMap(sessionId =>
    io(sessionId)
      .startWith({sessionId})
  )
);

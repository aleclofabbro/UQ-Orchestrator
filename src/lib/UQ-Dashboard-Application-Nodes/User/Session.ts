import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { AnnounceSessionId } from 'lib/UQ-IO-Types/Legatus';
import { SessionId } from 'lib/UQ-Data-Types';
import { User } from 'lib/UQ-Dashboard-Application-Types';

interface Config {
  request$: Observable<SessionId>;
  api$: Observable<AnnounceSessionId>;
}
export const Session = ({
  request$,
  api$
}: Config): Observable<User> => api$.switchMap(
  io => request$.mergeMap(sessionId =>
    io(sessionId)
      .startWith({sessionId})
  )
);

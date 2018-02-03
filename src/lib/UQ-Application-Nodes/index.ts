import { User } from 'lib/UQ-Types-Application';
import { AnnounceSessionId } from 'lib/UQ-Api/Legatus';
import { Observable } from '@reactivex/rxjs';
import { userSessionNode } from 'lib/UQ-Application-Nodes/UserSession';
import { SessionId } from 'lib/UQ-Types-Data';

export interface App {
  user: User;
}
export const appNode = (
  announceSessionIdIO$: Observable<AnnounceSessionId>,
  announceSessionIdRequest$: Observable<SessionId>
) => {
  const user$ = userSessionNode(announceSessionIdRequest$, announceSessionIdIO$);

  return Observable.combineLatest<App>(
    user$,
    announceSessionIdRequest$,
    (
      user
    ) => ({
      user
    })
  );
};

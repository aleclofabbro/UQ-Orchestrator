import { AnnounceSessionId } from 'lib/UQ-Api/Legatus';
import { Observable } from '@reactivex/rxjs';
import { userSessionNode } from 'lib/UQ-Application-Nodes/UserSession';
import { SessionId } from 'lib/UQ-Types-Data';

export const appNode = (
  announceSessionIdIO$: Observable<AnnounceSessionId>,
  announceSessionIdRequest$: Observable<SessionId>
) => {
  const userSessoin$ = userSessionNode(announceSessionIdRequest$, announceSessionIdIO$);

  return Observable.combineLatest(
    userSessoin$,
    (
      userSession
    ) => ({
      userSession
    })
  );
};

import { User } from 'lib/UQ-Dashboard-Application-Types';
import { AnnounceSessionId } from 'lib/UQ-IO-Types/Legatus';
import { Observable } from '@reactivex/rxjs';
import { userSessionNode } from 'lib/UQ-Dashboard-Application-Nodes/User';
import { SessionId } from 'lib/UQ-Data-Types';

export interface Main {
  user: User;
}
export const mainNode = (
  announceSessionIdIO$: Observable<AnnounceSessionId>,
  announceSessionIdRequest$: Observable<SessionId>
) => {
  const user$ = userSessionNode(announceSessionIdRequest$, announceSessionIdIO$);

  return Observable.combineLatest<Main>(
    user$,
    announceSessionIdRequest$,
    (
      user
    ) => ({
      user
    })
  );
};

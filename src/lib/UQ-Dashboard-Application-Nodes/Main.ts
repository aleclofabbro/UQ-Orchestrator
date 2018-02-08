import { User } from 'lib/UQ-Dashboard-Application-Types';
import { AnnounceSessionId } from 'lib/UQ-IO-Types/Legatus';
import { Observable } from '@reactivex/rxjs';
import { userSessionNode } from 'lib/UQ-Dashboard-Application-Nodes/User';
import { SessionId } from 'lib/UQ-Data-Types';

export interface Main {
  user: User;
}
interface Config {
  announceSessionId$: Observable<AnnounceSessionId>;
  announceSessionIdRequest$: Observable<SessionId>;
}
export const mainNode = ({
  announceSessionId$,
  announceSessionIdRequest$
}: Config) => {
  const user$ = userSessionNode({announceSessionIdRequest$, announceSessionId$});

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

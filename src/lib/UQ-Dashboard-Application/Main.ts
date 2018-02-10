import { User } from 'lib/UQ-Dashboard-Application-Types';
import { AnnounceSessionId } from 'lib/UQ-IO-Types/Legatus';
import { Observable } from '@reactivex/rxjs';
import { Session } from 'lib/UQ-Dashboard-Application/Nodes/User/Session';
import { SessionId } from 'lib/UQ-Data-Types';

export interface Main {
  user: User;
}
interface Config {
  session: {
    api$: Observable<AnnounceSessionId>;
    request$: Observable<SessionId>;
  };
}
export const mainNode = ({
  session
}: Config) => {
  const user$ = Session(session);

  return Observable.combineLatest<Main>(
    user$,
    // session.request$,
    (
      user
    ) => ({
      user
    })
  );
};

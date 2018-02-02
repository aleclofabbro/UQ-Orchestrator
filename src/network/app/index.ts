import {
  AnnounceSessionId
} from 'src/lib/UQ-Api/Legatus/index';
import { Observable } from '@reactivex/rxjs';
import { user$fact as userFact } from 'src/lib/UQ-Application-Nodes/User';
import { SessionId } from 'src/lib/UQ-Types-Data';
export default (
  announceSessionIdIO$: Observable<AnnounceSessionId>,
  announceSessionIdRequest$: Observable<SessionId>
) => {
  const user$ = userFact(announceSessionIdRequest$, announceSessionIdIO$);

  return Observable.combineLatest(
    user$,
    (
      user
    ) => ({
      user
    })
  );
};

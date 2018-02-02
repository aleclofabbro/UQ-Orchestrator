import {
  AnnounceSessionIdPayload,
  AnnounceSessionId
} from 'src/lib/UQ-Api/Legatus/index';
import { Observable } from '@reactivex/rxjs';
import { user as userFact } from 'src/lib/UQ-Application-Nodes/User';
export default (
  announceSessionIdIO$: Observable<AnnounceSessionId>,
  announceSessionIdRequest$: Observable<AnnounceSessionIdPayload>
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

import { AnnounceSessionIdPayload, AnnounceSessionId, AnnounceSessionIdResponseValue } from './../../lib/UQ-domain/Api/Legatus/index';
import { Observable } from '@reactivex/rxjs';
import { user as userFact } from '../user';
import { AnonymousSubject } from '@reactivex/rxjs/dist/package/Subject';
export default (
  announceSessionIdIO$: Observable<AnnounceSessionId>,
  announceSessionIdTrigger$: AnonymousSubject<AnnounceSessionIdPayload>
) => {
  const user$ =  userFact (announceSessionIdTrigger$, announceSessionIdIO$);

  return Observable.combineLatest(
    user$,
    (
      user
    ) => ({
      user
    })
  )
    .scan < {user:AnnounceSessionIdResponseValue | null}, { user: (AnnounceSessionIdResponseValue | null) & { logout: () => void } }>(
      (x) => {
    const ret = {
      user: {
        ...x.user,
        logout: ()=>{
          if (!x.user){
            return;
          }
          announceSessionIdTrigger$.next(`(Math.random()*1e7).toString(Math.random()*10+16)`);
        }
      }
    };
    return ret;
  });
};

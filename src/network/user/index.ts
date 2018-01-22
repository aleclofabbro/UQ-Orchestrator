import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { OrchestratorNode, Endpoint } from '../../lib/UQ-domain/Data';
import endpointUrl from '../../lib/utils/endpointUrl';
import wsLegatusSessionSrv from './io/wsLegatusSession';
export default (
  initUser: OrchestratorNode | null,
  legatusEndpoint: Endpoint,
  sessionId$: Observable<string>
): Observable<OrchestratorNode | null> => {
  const legatusUrl = endpointUrl(legatusEndpoint);
  const wsLegatusSession = wsLegatusSessionSrv(legatusUrl);
  const user$ = sessionId$
    .mergeMap(wsLegatusSession);

  return user$.startWith(initUser);
};
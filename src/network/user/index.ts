import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { OrchestratorNode, Endpoint } from '../../lib/UQ-domain/Data';
import { connect as io } from 'socket.io-client';
import endpointUrl from '../../lib/utils/endpointUrl';
export default (
  initUser: OrchestratorNode | null,
  legatusEndpoint: Endpoint,
  sessionId$: Observable<string>
): Observable<OrchestratorNode | null> => {
  const legatusUrl = endpointUrl(legatusEndpoint);
  type WSResp = { ip: string, session_id: string, name: string };
  const user$ = sessionId$
    .mergeMap(sessionId => {
      const socket = io(legatusUrl);
      // TODO: move in ./io/index.ts
      return Observable.fromEvent<WSResp>(socket, sessionId)
        .take(1)
        .do(() => socket.close())
        .map<WSResp, OrchestratorNode>((wsResp) => ({
          orchestrator: {
            ip: wsResp.ip,
            protocol: 'http',
            port: 8080
          },
          xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
          name: wsResp.name
        }))
        .startWith(null);
    });
  return user$.startWith(initUser);
};
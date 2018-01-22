import { connect as io } from 'socket.io-client';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { OrchestratorNode } from '../../../lib/UQ-domain/Data';

type WSResp = { ip: string, session_id: string, name: string };
export default (legatusUrl: string) => (sessionId: string) => {
  const socket = io(legatusUrl);
  return Observable.fromEvent<WSResp>(socket, sessionId)
    .take(1)
    .do(() => socket.close())
    .map<WSResp, OrchestratorNode & {session_id: string}>((wsResp) => ({
      orchestrator: {
        ip: wsResp.ip,
        protocol: 'http',
        port: 8080
      },
      xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
      session_id: wsResp.session_id,
      name: wsResp.name
    }))
    .startWith(null);
};
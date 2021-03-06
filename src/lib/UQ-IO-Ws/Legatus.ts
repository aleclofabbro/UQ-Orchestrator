import { SessionId, Endpoint } from 'lib/UQ-Data-Types';
import { connect as socketConnectTo } from 'socket.io-client';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import * as Api from 'lib/UQ-IO-Types/Legatus';
import { endpointUrl } from 'lib/utils/endpointUrl';

interface WSResp { ip: string; session_id: string; name: string; }
export const announceSessionId = (legatusEndpoint: Endpoint): Api.AnnounceSessionId =>
  (sessionId: SessionId) => {
    const socket = socketConnectTo(endpointUrl(legatusEndpoint));
    socket.emit('message', sessionId);
    return Observable.fromEvent<WSResp>(socket, sessionId)
      .take(1)
      .do(() => socket.close())
      .map((wsResp) => ({
        orchestrator: {
          ip: wsResp.ip,
          protocol: 'http',
          port: 8080
        },
        xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
        name: wsResp.name,
        sessionId: wsResp.session_id
      }));
  };
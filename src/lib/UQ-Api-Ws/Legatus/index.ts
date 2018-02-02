import { SessionId, Endpoint, Protocol } from 'lib/UQ-Types-Data';
import { connect as socketConnectTo } from 'socket.io-client';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import * as Api from 'lib/UQ-Api/Legatus';
import epUrl from 'lib/utils/endpointUrl';

interface WSResp { ip: string; session_id: string; name: string; }
export const announceSessionId = (legatusEndpoint: Endpoint): Api.AnnounceSessionId =>
  (sessionId: SessionId) => {
    const socket = socketConnectTo(epUrl(legatusEndpoint));
    socket.emit('message', sessionId);
    return Observable.fromEvent<WSResp>(socket, sessionId)
      .take(1)
      .do(() => socket.close())
      .map((wsResp) => ({
        orchestrator: {
          ip: wsResp.ip,
          protocol: Protocol.http,
          port: 8080
        },
        xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
        name: wsResp.name,
        sessionId: wsResp.session_id
      }));
  };
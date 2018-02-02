import { Endpoint, Protocol } from './../../../Data';
import { connect as io } from 'socket.io-client';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import * as Api from '../../../Api/Legatus';
import epUrl from '../../../../../lib/utils/endpointUrl';

interface WSResp { ip: string; session_id: string; name: string; }
export default (legatusEndpoint: Endpoint): Api.AnnounceSessionId => (sessionId: Api.AnnounceSessionIdPayload) => {
  const socket = io(epUrl(legatusEndpoint));
  socket.emit('message', sessionId)
  return Observable.fromEvent<WSResp>(socket, sessionId)
    .take(1)
    .do(() => socket.close())
    .map((wsResp) => ({
      orchestrator: {
        ip: wsResp.ip,
        protocol: ('http' as Protocol),
        port: 8080
      },
      xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
      name: wsResp.name,
      sessionId: wsResp.session_id
    }));
};
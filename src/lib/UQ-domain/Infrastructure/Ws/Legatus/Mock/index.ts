import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import * as Api from '../../../../Api/Legatus';
import { Scheduler } from '@reactivex/rxjs/dist/package/Scheduler';

export const orchNode = (sessionId: string): Api.AnnounceSessionIdResponseValue => ({
  orchestrator: {
    ip: '12.23.34.45',
    protocol: 'http',
    port: 8080
  },
  xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
  name: 'myname',
  sessionId
});
export const service = (frames: number, scheduler?: Scheduler): Api.AnnounceSessionId => (sessionId: Api.AnnounceSessionIdPayload) =>
  Observable.of<Api.AnnounceSessionIdResponseValue>(orchNode(sessionId)).delay(frames, scheduler);
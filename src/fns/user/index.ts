import { OrchestratorNode } from '../../lib/UQ-domain/Data';
import { connect as io } from 'socket.io-client';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
export default (legatusUrl: string, sessionId$: Observable<string>) => {
  const user$ = sessionId$
    .mergeMap(sessionId => {
      const socket = io(legatusUrl);
      return Observable.fromEvent<OrchestratorNode>(socket, sessionId)
        .take(1)
        .do(() => socket.close())
        .startWith(null);
    });
  return user$;
};
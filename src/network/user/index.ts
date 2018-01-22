import { OrchestratorNode, Endpoint } from '../../lib/UQ-domain/Data';
import { connect as io } from 'socket.io-client';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import endpointUrl from '../../lib/utils/endpointUrl';
export default (initUser: OrchestratorNode | null, legatusEndpoint: Endpoint, sessionId$: Observable<string>) => {
  const legatusUrl = endpointUrl(legatusEndpoint);
  const user$ = sessionId$
    .mergeMap(sessionId => {
      const socket = io(legatusUrl);
      // TODO: move in ./io/index.ts
      return Observable.fromEvent<OrchestratorNode>(socket, sessionId)
        .take(1)
        .do(() => socket.close())
        .startWith(null);
    });
  return user$.startWith(initUser);
};
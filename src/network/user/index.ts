import { OrchestratorNode } from './../../lib/UQ-domain/Data';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import { AnnounceSessionIdPayload, AnnounceSessionId } from './../../lib/UQ-domain/Api/Legatus/index';
import { Endpoint } from '../../lib/UQ-domain/Data';
import endpointUrl from '../../lib/utils/endpointUrl';
import { PartialObserver } from '@reactivex/rxjs/dist/package/Observer';

export const user$ = (
  announceSessionId$: Observable<AnnounceSessionIdPayload>,
  io: AnnounceSessionId
) => announceSessionId$
      .mergeMap(payload => Observable.of<void>(null).concat(io(payload)))

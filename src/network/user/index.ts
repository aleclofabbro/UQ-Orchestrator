import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import {
  AnnounceSessionIdPayload,
  AnnounceSessionId,
  AnnounceSessionIdResponseValue
} from './../../lib/UQ-domain/Api/Legatus/index';

export const user$ = (
  triggerRequest$: Observable<AnnounceSessionIdPayload>,
  announceSessionId$: Observable<AnnounceSessionId>
): Observable<AnnounceSessionIdResponseValue | null> => announceSessionId$.switchMap(
  io => triggerRequest$.mergeMap(
    payload => io(payload).startWith(null)));


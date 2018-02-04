import { Config } from 'lib/UQ-Dashboard-Application-Types';
import { SessionId } from 'lib/UQ-Data-Types/index';
import { Observable } from '@reactivex/rxjs';
import { mainNode } from 'lib/UQ-Dashboard-Application-Nodes';
import { announceSessionId } from 'lib/UQ-IO-Ws/Legatus';

export const main  = (
  config$: Observable<Config>,
  announceSessionIdRequest$: Observable<SessionId>
) => {
  const announceSessionIdIO$ = config$.map(config => announceSessionId(config.legatus));
  const main$ = mainNode(announceSessionIdIO$, announceSessionIdRequest$);

  return main$;
};

import { SessionId } from 'lib/UQ-Types-Data/index';
import { Observable } from '@reactivex/rxjs';
import { Config } from 'lib/UQ-Types-Data/index';
import { appNode, App } from 'lib/UQ-Application-Nodes';
import { announceSessionId } from 'lib/UQ-IO-Ws/Legatus';

export const app  = (
  config$: Observable<Config>,
  announceSessionIdRequest$: Observable<SessionId>
) => {
  const announceSessionIdIO$ = config$.map(config => announceSessionId(config.legatus));
  const app$ = appNode(announceSessionIdIO$, announceSessionIdRequest$);

  return app$
    .scan<App>((acc, curr) =>
      ({
        ...curr
      }));
};

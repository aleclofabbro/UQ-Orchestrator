import { UserSession } from 'lib/UQ-Types-Application';
import { SessionId } from 'lib/UQ-Types-Data/index';
import { Subject, Observable } from '@reactivex/rxjs';
import { Config } from 'lib/UQ-Types-Data/index';
import { appNode } from 'lib/UQ-Application-Nodes';
import { announceSessionId } from 'lib/UQ-Api-Ws/Legatus';

export interface App {
  userSession: UserSession;
}

export const app  = (
  config$: Observable<Config>
) => {
  const announceSessionIdIO$ = config$.map(config => announceSessionId(config.legatus));
  const announceSessionIdRequest$ = new Subject<SessionId>();
  const app$ = appNode(announceSessionIdIO$, announceSessionIdRequest$);

  return app$
    .scan<App>((acc, curr) =>
      ({
        userSession: curr.userSession
      }),
    {
      userSession: { user: null }
    });
};

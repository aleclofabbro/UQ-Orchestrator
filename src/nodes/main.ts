import { MainApp } from './main';
import { Config } from 'lib/UQ-Dashboard-Application-Types';
import { SessionId } from 'lib/UQ-Data-Types/index';
import { Observable } from '@reactivex/rxjs';
import { mainNode, Main } from 'lib/UQ-Dashboard-Application-Nodes';
import { announceSessionId } from 'lib/UQ-IO-Ws/Legatus';

export interface MainApp extends Main {
  config: Config;
}
export const mainApp  = (
  config$: Observable<Config>,
  announceSessionIdRequest$: Observable<SessionId>
) => {
  const announceSessionIdIO$ = config$
    .map(config => ({...config.orchestratorConfig.legatus, protocol: 'ws'}))
    .map(legatusEndpoint => announceSessionId(legatusEndpoint));
  const main$ = mainNode(announceSessionIdIO$, announceSessionIdRequest$);

  return Observable.combineLatest<MainApp>(
    main$,
    config$,
    (
      main,
      config
    ) => ({
      ...main,
      config
    })
  );
};

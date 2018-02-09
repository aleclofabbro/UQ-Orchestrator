import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TemplateView } from 'view/Template';
import { SessionId, OrchestratorConfig } from 'lib/UQ-Data-Types';

import registerServiceWorker from './registerServiceWorker';
import { mainApp, MainApp } from 'nodes/main';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import { Config } from 'lib/UQ-Dashboard-Application-Types';

// tslint:disable-next-line:no-any no-console
const log = (tag: any) => (o?: any) => console.log(tag, o);
// tslint:disable-next-line:no-any

// TODO: move sessionId generation into an IO
const logout = () => $announceSessionIdRequest$.next(`${(Math.random() * 1e9).toString(Math.random() * 10 + 16)}`);
const render = (s: MainApp) => {
  log('render')(s);
  // tslint:disable-next-line:no-any
  (window as any).state = s;
  ReactDOM.render(
    <div>
      <TemplateView { ...s } { ...{ logout } } />
    </div>
    ,
    document.getElementById('root') as HTMLElement
  );
};

registerServiceWorker();

// const localIp = '192.168.43.166';
const localIp = '192.168.0.101';
const orchestratorConfig: OrchestratorConfig = {
  peers: '52.225.217.168;52.167.211.151;52.225.218.133',
  insight: { protocol: 'http', ip: '52.167.211.151', port: '3001' },
  broker: { protocol: 'tcp', ip: localIp, port: '1883' },
  registry: { protocol: 'http', ip: localIp, port: '8080' },
  imprinter: { protocol: 'http', ip: localIp, port: '8090' },
  legatus: { protocol: 'http', ip: localIp, port: '3000' },
  version: '0.4.0'
};

const conf: Config = {
  orchestratorConfig
};
// tslint:disable-next-line:no-any
(window as any).conf = conf;

const $announceSessionIdRequest$ = new Subject<SessionId>();
const config$ = new Subject<Config>();
// tslint:disable-next-line:no-any
(window as any).config$ = config$;
// tslint:disable-next-line:no-any
(window as any).logout = logout;

const main$ = mainApp({
  config$,
  session: {
    request$: $announceSessionIdRequest$
  }
});

main$.subscribe(render);

config$.next(conf);
logout();
// tslint:disable-next-line:no-any
// (window as any).go = () => {
//   let i = 0;
//   for (; i < 100000; i++) {
//     config$.next(conf);
//     // tslint:disable-next-line:no-any
//     // (window as any).state.tabacchi.mine();
//   }
//   log('**********')(i);
// };
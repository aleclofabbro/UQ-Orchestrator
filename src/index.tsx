import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TemplateView } from 'view/template';
import { SessionId } from 'lib/UQ-Data-Types';

import registerServiceWorker from './registerServiceWorker';
import { main } from 'nodes/main';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import { Main } from 'lib/UQ-Dashboard-Application-Nodes';
import { Config } from 'lib/UQ-Dashboard-Application-Types';

// tslint:disable-next-line:no-any no-console
const log = (tag: any) => (o?: any) => console.log(tag, o);
// tslint:disable-next-line:no-any

// TODO: move sessionId generation into an IO
const logout = () => announceSessionIdRequest$.next(`${(Math.random() * 1e9).toString(Math.random() * 10 + 16)}`);
const render = (s: Main) => {
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

const conf: Config = {
  'legatus': {
    'ip': '127.0.0.1',
    'protocol': 'ws',
    'port': '3000'
  }
};
// tslint:disable-next-line:no-any
(window as any).conf = conf;

const announceSessionIdRequest$ = new Subject<SessionId>();
const config$ = new Subject<Config>();
// tslint:disable-next-line:no-any
(window as any).config$ = config$;
// tslint:disable-next-line:no-any
(window as any).logout = logout;

const main$ = main(config$, announceSessionIdRequest$);

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
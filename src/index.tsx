import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LoginView from 'view/login';
import { Config, Protocol } from 'lib/UQ-Types-Data';

import registerServiceWorker from './registerServiceWorker';
import { app, App } from 'app';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';

// tslint:disable-next-line:no-any no-console
const log = (tag: any) => (o?: any) => console.log(tag, o);
// tslint:disable-next-line:no-any
const render = (s: App) => {
  log('render')(s);
  // tslint:disable-next-line:no-any
  (window as any).state = s;
  ReactDOM.render(
    <LoginView session={('s.sessionId' as string)} />,
    document.getElementById('root') as HTMLElement);
};

registerServiceWorker();

const conf: Config = {
  'legatus': {
    'ip': '127.0.0.1',
    'protocol': Protocol.ws,
    'port': '3000'
  }
};
// tslint:disable-next-line:no-any
(window as any).conf = conf;

const config$ = new Subject<Config>();
// tslint:disable-next-line:no-any
(window as any).config$ = config$;

const app$ = app(config$);

app$.subscribe(render);

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
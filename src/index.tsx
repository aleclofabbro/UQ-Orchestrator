// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import LoginView from './view/login';
import { Config } from './lib/UQ-domain/Data';

import registerServiceWorker from './registerServiceWorker';
import app from './network/app';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';

// tslint:disable-next-line:no-any no-console
const log = (tag: any) => (o?: any) => console.log(tag, o);
// tslint:disable-next-line:no-any
const render = (s: any) => {
  log('render')(s);
  // tslint:disable-next-line:no-any
  (window as any).state = s;
  // ReactDOM.render(
  //   <LoginView session={('s.sessionId' as string)} />,
  //   document.getElementById('root') as HTMLElement);
};

registerServiceWorker();

const conf: Config = {
  'imprinter': {
    'ip': '127.0.0.1',
    'protocol': 'http',
    'port': '8090'
  },
  'legatus': {
    'ip': '127.0.0.1',
    'protocol': 'ws',
    'port': '3000'
  },
  'tabacchi': {
    // 'ip': '52.225.217.168',
    'ip': 'zzzzzzzzzzzgoogle.it',
    'protocol': 'http',
    'port': '80'
  }
};
// tslint:disable-next-line:no-any
(window as any).conf = conf;

const config$ = new Subject<Config>();
// tslint:disable-next-line:no-any
(window as any).config$ = config$;

const {state$, event$} = app(config$);

// app$
//   .switchMap(({ state$ }) => state$)
state$
  .subscribe(render, log('state$ ERROR'), log('state$ END'));

// app$
//   .switchMap(({ event$ }) => event$)
event$
  .subscribe(log('events$ NEXT'), log('events$ ERROR'), log('events$ END'));

// tslint:disable-next-line:no-any
(window as any).go = () => {
  let i = 0;
  for (; i < 100000; i++) {
    config$.next(conf);
    // tslint:disable-next-line:no-any
    // (window as any).state.tabacchi.mine();
  }
  log('**********')(i);
};
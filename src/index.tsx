import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TemplateView from 'view/template';
import { Config, SessionId } from 'lib/UQ-Types-Data';

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
    <div>
      <TemplateView {...{
        ...s,
        logout: ()=>announceSessionIdRequest$.next(`${(Math.random()*1e9).toString(Math.random()*10+16)}`)
      }} />
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
(window as any).announceSessionIdRequest$ = announceSessionIdRequest$;

const app$ = app(config$, announceSessionIdRequest$);

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
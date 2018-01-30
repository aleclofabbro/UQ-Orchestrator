// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import LoginView from './view/login';

import registerServiceWorker from './registerServiceWorker';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { Config } from './lib/UQ-domain/Data';
// import userSrv from './network/user';
// import imprinterSrv from './network/imprinter';
// import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import tabacchiSrv from './network/tabacchi';
import { Subject } from '@reactivex/rxjs';

// import imprinterHttpApiFact from './lib/UQ-domain/Infrastructure/Http/imprinter';
import tabacchiHttpApiFact from './lib/UQ-domain/Infrastructure/Http/Tabacchi/index';

import { RechargeRequest } from './lib/UQ-domain/Api/Tabacchi/index';

// tslint:disable-next-line:no-console no-any
const log = (tag: any) => (o?: any) => console.log(tag, o);
// tslint:disable-next-line:no-any
// const obsLog = (tag: any) => ({
//   next: log(`N: ${tag}`),
//   error: log(`E: ${tag}`),
//   completed: log(`C: ${tag}`)
// });

fetch('conf.json')
  .then<Config>(response => response.json())
  .catch(x => ({
    'defaultImprinter': {
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
      'ip': 'google.it',
      'protocol': 'http',
      'port': '80'
    }
  } as Config))
  .then(config => {

    const $rechargeTrigger$ = new Subject<RechargeRequest>();
    const $mineTrigger$ = new Subject<void>();
    // const $sessionId$ = new Subject<string>();
    // const user$ = userSrv(null, config.legatus, $sessionId$);
    // const imprinter$ = imprinterSrv(config.defaultImprinter);
    const {
      state$: tabacchiState$,
      mineResponse$,
      rechargeResponse$
    } = tabacchiSrv(
        tabacchiHttpApiFact(config.tabacchi),
        $rechargeTrigger$.asObservable(),
        $mineTrigger$.asObservable());

    const event$ = Observable.merge(
      mineResponse$,
      rechargeResponse$,
    );

    const state$ = Observable.combineLatest(
      tabacchiState$,
      (
        tabacchi,
      ) => ({
        tabacchi,
        tabacchiRecharge: (req: RechargeRequest) => $rechargeTrigger$.next(req),
        tabacchiMine: () => $mineTrigger$.next()
      }));

    return {
      state$,
      event$
    };
  })
  .then(({ state$, event$ }) => {
    event$
      .subscribe(console.log, console.error);
    state$
      .subscribe(render);

  });

// tslint:disable-next-line:no-any
const render = (s: any) => {
  // tslint:disable-next-line:no-any
  log('render')(s);
  // tslint:disable-next-line:no-any
  (window as any).state = s;
  // ReactDOM.render(
  //   <LoginView session={('s.sessionId' as string)} />,
  //   document.getElementById('root') as HTMLElement);
};
// Observable.combineLatest(() => ({}))
//   .subscribe(({}) => ReactDOM.render(
//     <LoginView sessionId={}>,
//     document.getElementById('root') as HTMLElement)
//   );

registerServiceWorker();

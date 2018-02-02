import { Observable } from '@reactivex/rxjs';
import {
  AnnounceSessionIdResponseValue,
  AnnounceSessionIdPayload,
  AnnounceSessionId
} from './../../../lib/UQ-domain/Api/Legatus/index';
import { user$ } from '../';
import { rxSandbox } from 'rx-sandbox';
import { Observable as Obs_ } from 'rxjs/Observable';
import { IScheduler } from '@reactivex/rxjs/dist/package/Scheduler';

// tslint:disable:max-line-length
const mockedAnnounceResponse = (sessionId: AnnounceSessionIdPayload): AnnounceSessionIdResponseValue => ({
  orchestrator: {
    ip: '12.23.34.45',
    protocol: 'http',
    port: 8080
  },
  xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
  name: 'myname',
  sessionId
});

describe('user$', () => {

  it('1', () => {
    const tvals = {
      1: 'xxxx',
      2: 'yyyy'
    };

    const rvals = {
      n: null,
      a: mockedAnnounceResponse('xxxx'),
      b: mockedAnnounceResponse('yyyy')
    };

    /* beautify preserve:start */
    const { hot: h, cold, flush, getMessages, e, s, scheduler } = rxSandbox.create();
    //                         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4
    //                         012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
    const TRIGGER$ =        h('-----1-------2-------------|', tvals)
    const EXPECTED =        e('-----n--a----n-------b-----|', rvals)
    const RESPONSE_A$ =       cold('---a|', rvals)
    const RESPONSE_B$ =               cold('--------b|', rvals)
    const ioVals = { A: () => Observable.from(RESPONSE_A$), B: () => Observable.from(RESPONSE_B$) }
    const IO$ =             h('--A-------B----------------|', ioVals) as any as Observable<AnnounceSessionId>;
    //                         012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
    //                         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4
    /* beautify preserve:end */

    const trigger$ = Observable.from(TRIGGER$);

    const io$ = Observable.from(IO$);
    const resp$ = user$(trigger$, io$);

    const RESP$: Obs_<AnnounceSessionIdResponseValue | void> = resp$ as any;
    const MESSAGES = getMessages(RESP$);
    flush();

    expect(MESSAGES).toEqual(EXPECTED);
  });

});

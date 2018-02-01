import { AnnounceSessionIdResponseValue, AnnounceSessionIdPayload } from './../../../lib/UQ-domain/Api/Legatus/index';
import { user$ } from '../';
import { rxSandbox } from 'rx-sandbox';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { Observable as Ox } from 'rxjs/Observable';

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
    const RESPONSE_A$ =       cold('---a|', rvals) as any as Observable<AnnounceSessionIdResponseValue>
    const RESPONSE_B$ =               cold('--------b|', rvals) as any as Observable<AnnounceSessionIdResponseValue>
    const EXPECTED =        e('-----n--a----n-------b-----|', rvals)
    //                         012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
    //                         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4
    /* beautify preserve:end */

    const trigger$ = Observable.from(TRIGGER$);
    const responses = [
      RESPONSE_A$,
      RESPONSE_B$
    ];
    const resp$ = user$(trigger$, x => responses.shift());
    // const resp$ = user$(trigger$, req => cold('---a|', { a: mockedAnnounceResponse(req) }) as any as Observable<AnnounceSessionIdResponseValue>);

    const MESSAGES = getMessages(resp$ as any as Ox<AnnounceSessionIdResponseValue | void>);
    flush();

    expect(MESSAGES).toEqual(EXPECTED);
  });

});

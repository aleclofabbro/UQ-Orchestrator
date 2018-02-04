import { rxSandbox } from 'rx-sandbox';
import { Observable } from '@reactivex/rxjs';
import { Observable as Obs_ } from 'rxjs/Observable';
import { userSessionNode } from '../';
import { SessionId } from 'lib/UQ-Data-Types';
import { User } from 'lib/UQ-Dashboard-Application-Types';
import { AnnounceSessionId } from 'lib/UQ-IO-Types/Legatus';
// tslint:disable:max-line-length

const mockedAnnounceResponse = (sessionId: SessionId): User => ({
  orchestrator: {
    ip: '12.23.34.45',
    protocol: 'http',
    port: 8080
  },
  xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
  name: 'myname',
  sessionId
});

describe('userSessionNode', () => {

  it('1', () => {
    const reqVals: { [prop: number]: SessionId } = {
      1: 'xxxx',
      2: 'yyyy'
    };

    const respVals: { [p: string]: User } = {
      a: mockedAnnounceResponse(reqVals[1]),
      b: mockedAnnounceResponse(reqVals[2])
    };

    const userSessionVals: { [p: string]: User } = {
      a: { sessionId: 'xxxx' },
      A: respVals.a ,
      b: { sessionId: 'yyyy' },
      B: respVals.b
    };

    const ioServiceVals = { A: () => Observable.from(RESPONSE_A$), B: () => Observable.from(RESPONSE_B$) };

    /* beautify preserve:start */
    const { hot: h, cold, flush, getMessages, e/*, s, scheduler*/ } = rxSandbox.create();
    //                         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4
    //                         012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
    const IO$ = /*        */h('--A-------B----------------|', ioServiceVals);
    const REQUEST$ = /*   */h('-----1-------2-------------|', reqVals);
    const RESPONSE_A$ = /*  */cold('---a|', respVals);
    const RESPONSE_B$ = /*          */cold('--------b|', respVals);
    const EXPECTED = /*   */e('-----a--A----b-------B-----|', userSessionVals);
    //                         012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
    //                         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4
    /* beautify preserve:end */

    const request$ = Observable.from(REQUEST$);

    // tslint:disable-next-line:no-any
    const io$ = Observable.from(IO$ as any as Observable<AnnounceSessionId>);
    const response$ = userSessionNode(request$, io$);

    // tslint:disable-next-line:no-any
    const RESPONSE$: Obs_<User> = response$ as any;
    const MESSAGES = getMessages(RESPONSE$);

    flush();
    expect(MESSAGES).toEqual(EXPECTED);
  });

});

import { SessionId } from '../../../UQ-Types-Data';
import { UserSession, User } from '../../../UQ-Types-Application';
import { Protocol } from '../../../UQ-Types-Data';
import { Observable } from '@reactivex/rxjs';
import {
  AnnounceSessionId
} from '../../../UQ-Api/Legatus/index';
import { user$fact } from '../';
import { rxSandbox } from 'rx-sandbox';
import { Observable as Obs_ } from 'rxjs/Observable';

// tslint:disable:max-line-length
const mockedAnnounceResponse = (sessionId: SessionId): User => ({
  orchestrator: {
    ip: '12.23.34.45',
    protocol: Protocol.http,
    port: 8080
  },
  xpub: 'NO XPUB : DEFAULT ORCHESTRATOR',
  name: 'myname',
  sessionId
});

describe('user$', () => {

  it('1', () => {
    const tvals: {[prop: number]: SessionId} = {
      1: 'xxxx',
      2: 'yyyy'
    };

    const rvals: {[p:string]: User | null} = {
      n: null,
      a: mockedAnnounceResponse(tvals[1]),
      b: mockedAnnounceResponse(tvals[2])
    };

    const usvals: { [p: string]: UserSession } = {
      N: {user: null},
      A: {user: rvals.a},
      B: {user: rvals.b}
    };

    const ioVals = { A: () => Observable.from(RESPONSE_A$), B: () => Observable.from(RESPONSE_B$) }

    /* beautify preserve:start */
    const { hot: h, cold, flush, getMessages, e, s, scheduler } = rxSandbox.create();
    //                         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4
    //                         012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
    const IO$ =             h('--A-------B----------------|', ioVals) as any as Observable<AnnounceSessionId>;
    const TRIGGER$ =        h('-----1-------2-------------|', tvals)
    const RESPONSE_A$ =       cold('---a|', rvals)
    const RESPONSE_B$ =               cold('--------b|', rvals)
    const EXPECTED =        e('-----N--A----N-------B-----|', usvals)
    //                         012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
    //                         0         1         2         3         4         5         6         7         8         9         0         1         2         3         4
    /* beautify preserve:end */

    const trigger$ = Observable.from(TRIGGER$);

    const io$ = Observable.from(IO$);
    const resp$ = user$fact(trigger$, io$);

    const RESP$: Obs_<UserSession> = resp$ as any;
    const MESSAGES = getMessages(RESP$);

    flush();
    expect(MESSAGES).toEqual(EXPECTED);
  });

});

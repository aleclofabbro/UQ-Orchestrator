import makeOneShot from '../../lib/utils/oneShot';
import { RechargeRequest, Mine, Recharge } from '../../lib/UQ-domain/Api/Tabacchi/index';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

type Input = Observable<{
  mine: Mine,
  recharge: Recharge,
  rechargeTrigger$: Observable<RechargeRequest>,
  mineTrigger$: Observable<void>
}>;
export default ( input$: Input ) => {

  const mine$ = input$.map(({ mineTrigger$, mine }) => {
    return makeOneShot(mine, mineTrigger$);
  });

  const state$ = Observable.combineLatest(
    mine$.switchMap((({ pending$ }) => pending$)),
    recharge$.switchMap((({ pending$ }) => pending$)),
    (
      minePending,
      rechargePending
    ) => ({
      minePending,
      rechargePending
    }));

  return {
    state$,
    mineResponse$: mine$.switchMap((({ response$ }) => response$)),
    rechargeResponse$: recharge$.switchMap((({ response$ }) => response$))
  };
};
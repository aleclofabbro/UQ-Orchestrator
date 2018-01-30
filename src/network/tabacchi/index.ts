import makeOneShot from '../../lib/utils/oneShot';
import { RechargeRequest, Mine, Recharge } from '../../lib/UQ-domain/Api/Tabacchi/index';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export default (
      api: {
        mine: Mine,
        recharge: Recharge
      },
      rechargeTrigger$: Observable<RechargeRequest>,
      mineTrigger$: Observable<void>
    ) => {

  const {
    pending$: rechargePending$,
    response$: rechargeResponse$
  } = makeOneShot(api.recharge, rechargeTrigger$);

  const {
    pending$: minePending$,
    response$: mineResponse$,
  } = makeOneShot(api.mine, mineTrigger$);

  const state$ = Observable.combineLatest(
    minePending$,
    rechargePending$,
    (
      minePending,
      rechargePending
    ) => ({
      minePending,
      rechargePending
    }));

  return {
    state$,
    mineResponse$,
    rechargeResponse$
  };
};
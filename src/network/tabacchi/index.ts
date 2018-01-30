import makeOneShot from '../../lib/utils/oneShot';
import { Api, RechargeRequest } from '../../lib/UQ-domain/Api/Tabacchi';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export default (
      api: Api,
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
import { Subject } from '@reactivex/rxjs';
import { Endpoint } from './../../lib/UQ-domain/Data';
import makeOneShot from '../../lib/utils/oneShot';
import io from './io/';
import { Tabacchi } from '../../lib/UQ-domain/Api';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export default (
      endpoint: Endpoint,
      $rechargeTrigger$: Subject<Tabacchi.RechargeRequest>,
      $mineTrigger$: Subject<void>
    ) => {
  const {
    rechargeAjax,
    mineAjax
  } = io(endpoint);
  const {
    pending$: rechargePending$,
    response$: rechargeResponse$
  } = makeOneShot(rechargeAjax, $rechargeTrigger$);

  const {
    pending$: minePending$,
    response$: mineResponse$,
  } = makeOneShot(mineAjax, $mineTrigger$);

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
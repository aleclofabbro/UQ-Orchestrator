import { Tabacchi as TabacchiApi } from './../../lib/UQ-domain/Api';
import { Endpoint } from './../../lib/UQ-domain/Data';
import makeOneShot from '../../lib/utils/oneShot';
import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import io from './io/';

export default (endpoint: Endpoint) => {
  const {
    rechargeAjax,
    mineAjax
  } = io(endpoint);
  const $rechargeTrigger$ = new Subject<TabacchiApi.RechargeRequest>();
  const {
    pending$: rechargePending$,
    request$: rechargeRequest$,
    response$: rechargeResponse$,
  } = makeOneShot($rechargeTrigger$, rechargeAjax);

  const $mineTrigger$ = new Subject<void>();
  const {
    pending$: minePending$,
    request$: mineRequest$,
    response$: mineResponse$,
  } = makeOneShot($mineTrigger$, mineAjax);

  return {
    $rechargeTrigger$,
    rechargePending$,
    rechargeRequest$,
    rechargeResponse$,
    $mineTrigger$,
    minePending$,
    mineRequest$,
    mineResponse$,
  };
};
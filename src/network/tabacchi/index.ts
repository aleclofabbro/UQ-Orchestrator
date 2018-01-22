import { Observable } from '@reactivex/rxjs/dist/package/Rx';
// import { Tabacchi as TabacchiApi } from './../../lib/UQ-domain/Api';
import { Endpoint } from './../../lib/UQ-domain/Data';
import makeOneShot from '../../lib/utils/oneShot';
// import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import io from './io/';

export default (endpoint: Endpoint) => {
  const {
    rechargeAjax,
    mineAjax
  } = io(endpoint);
  const {
    pending$: rechargePending$,
    request$: rechargeRequest$,
    response$: rechargeResponse$,
    trigger: rechargeTrigger
  } = makeOneShot(rechargeAjax);

  const {
    pending$: minePending$,
    request$: mineRequest$,
    response$: mineResponse$,
    trigger: mineTrigger
  } = makeOneShot(mineAjax);

  return Observable.combineLatest(
    rechargePending$,
    rechargeRequest$,
    rechargeResponse$,
    minePending$,
    mineRequest$,
    mineResponse$,
    (
      rechargePending,
      rechargeRequest,
      rechargeResponse,
      minePending,
      mineRequest,
      mineResponse,
    ) => ({
      recharge: {
        trigger: rechargeTrigger,
        pending: rechargePending,
        request: rechargeRequest,
        response: rechargeResponse,
      },
      mine: {
        trigger: mineTrigger,
        pending: minePending,
        request: mineRequest,
        response: mineResponse,
      }
    })
  );
};
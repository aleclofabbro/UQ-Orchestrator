import { Observable } from '@reactivex/rxjs/dist/package/Observable';
import { Config } from '../../lib/UQ-domain/Data';
import tabacchiSrv from '../../network/tabacchi';
import { Subject } from '@reactivex/rxjs';
import tabacchiHttpApiFact from '../../lib/UQ-domain/Infrastructure/Http/Tabacchi/Mock';
import { RechargeRequest } from '../../lib/UQ-domain/Api/Tabacchi/index';

export default (config$: Observable<Config>) => {

  const $rechargeTrigger$ = new Subject<RechargeRequest>();
  const $mineTrigger$ = new Subject<void>();
  const tabacchiInput$ = config$.map(({ tabacchi }) => ({
    ...tabacchiHttpApiFact(tabacchi),
    rechargeTrigger$: $rechargeTrigger$.asObservable(),
    mineTrigger$: $mineTrigger$.asObservable()
  }));
  const tabacchi$ = tabacchiSrv(tabacchiInput$);

  const event$ = Observable.merge(
    tabacchi$.mineResponse$,
    tabacchi$.rechargeResponse$,
  );

  const state$ = Observable.combineLatest(
    tabacchi$.state$,
    (
      tabacchi,
    ) => ({
      tabacchi: {
        ...tabacchi,
        recharge: (req: RechargeRequest) => $rechargeTrigger$.next(req),
        mine: () => $mineTrigger$.next()
      },
    }));

  return {
    state$,
    event$
  };
};

import { ObservableInput } from '@reactivex/rxjs/dist/package/Observable';

// vorrei : type Orchestrate<Holder> = (address: string, amount: number) => Holder<void>;
// ma HKT not supported..
// https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe
// https://stackoverflow.com/a/37323987/1455910
// Quindi qui imposto che l'holder del value del'Api sarà un ObservableInput

export type RechargeRequest = { address: string; amount: number; };
export interface Api {
  recharge: (request: RechargeRequest) => ObservableInput<void>;
  mine: () => ObservableInput<void>;
};
export default Api;

import { Observable } from '@reactivex/rxjs';
import { Scheduler } from '@reactivex/rxjs/dist/package/Scheduler';
import { Wallet as TWallet } from 'lib/UQ-Data-Types';
import { GetNodeInfo } from 'lib/UQ-IO-Types/Imprinter';

interface Config {
  api$: Observable<GetNodeInfo>;
  scheduler?: Scheduler;
  interval: number;
}

export const Wallet = ({
  api$,
  scheduler,
  interval = 10000
}: Config): Observable<TWallet | null> => api$.mergeMap(
    api => api()
    .repeatWhen(notifications => notifications.delay(interval, scheduler))
);

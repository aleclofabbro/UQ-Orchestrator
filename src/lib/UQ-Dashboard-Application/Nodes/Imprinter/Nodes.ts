import { Observable } from '@reactivex/rxjs';
import { Scheduler } from '@reactivex/rxjs/dist/package/Scheduler';
import { Node } from 'lib/UQ-Data-Types';
import { GetNodes } from 'lib/UQ-IO-Types/Imprinter';

interface Config {
  api$: Observable<GetNodes>;
  request$: Observable<void>;
  scheduler?: Scheduler;
  interval: number;
}
export const Nodes = ({
  api$,
  request$,
  scheduler,
  interval = 10000
}: Config): Observable<Node[]> => api$.mergeMap(
    api => request$
      .startWith(null)
      .mergeMap(() => api()
        .repeatWhen(notifications => notifications.delay(interval, scheduler))
      )
  );

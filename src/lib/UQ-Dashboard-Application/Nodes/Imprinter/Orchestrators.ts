import { Observable } from '@reactivex/rxjs';
import { Scheduler } from '@reactivex/rxjs/dist/package/Scheduler';
import { GetOrchestrators } from 'lib/UQ-IO-Types/Imprinter';
import { OrchestratorNode } from 'lib/UQ-Data-Types';

interface Config {
  api$: Observable<GetOrchestrators>;
  scheduler?: Scheduler;
  interval: number;
}

export const Orchestrators = ({
  api$,
  scheduler,
  interval = 10000
}: Config): Observable<OrchestratorNode[]> => api$.mergeMap(
    api => api()
      .repeatWhen(notifications => notifications.delay(interval, scheduler))
  );

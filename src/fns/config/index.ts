import { Config } from './../../lib/UQ-domain/Data';
import { BehaviorSubject } from '@reactivex/rxjs/dist/package/BehaviorSubject';

export default (config: Config) => new BehaviorSubject(config);
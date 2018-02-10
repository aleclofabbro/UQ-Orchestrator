import { Observable } from '@reactivex/rxjs';
import { User } from 'lib/UQ-Dashboard-Application-Types';

interface Config {
  user$: Observable<User>;
  init: User;
}
export const Session = ({
  user$,
  init
}: Config) => user$.startWith(init);
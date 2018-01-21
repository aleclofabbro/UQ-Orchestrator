import { BaseNode, Xpub } from './../../lib/UQ-domain/Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';
export default (
  excludingXpubs$: Observable<Xpub[]>,
  nodeList$: Observable<BaseNode[]>
) => {
  return Observable.combineLatest(excludingXpubs$, nodeList$)
    .map(([excludingXpubs, nodeList]) => nodeList.filter(node => !excludingXpubs.includes(node.xpub)));
};
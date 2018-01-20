import { mergeNodeLists } from '../../lib/utils/nodeList';
import { BehaviorSubject } from '@reactivex/rxjs/dist/package/BehaviorSubject';
import { BaseNode } from '../../lib/UQ-domain/Data';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

export default (addNodeList$: Observable<BaseNode[]>) => {
  const $nodeList$ = new BehaviorSubject<BaseNode[]>([]);
  addNodeList$
    .map(nodes => mergeNodeLists(nodes, $nodeList$.value))
    .subscribe($nodeList$);
  return $nodeList$.asObservable();
};

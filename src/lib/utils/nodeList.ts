import { BaseNode } from './../UQ-domain/Data';
export const mergeNodeLists = (mergeNodes: BaseNode[], toNodes: BaseNode[]) => {
  const xpubs = toNodes.map(node => node.xpub);
  const foundAtListIndexes: number[] = [];
  const foundAtNewIndexes: number[] = [];
  const mergedNodes = mergeNodes.map((node, newIndex) => {
    const listIndex = xpubs.indexOf(node.xpub);
    const exists = listIndex > -1;
    if (exists) {
      foundAtListIndexes.push(listIndex);
      foundAtNewIndexes.push(newIndex);
    }
    return {
      ...toNodes[listIndex],
      ...node
    };
  });
  return toNodes
    .filter((node, listIndex) => foundAtListIndexes.includes(listIndex))
    .concat(mergedNodes);
};
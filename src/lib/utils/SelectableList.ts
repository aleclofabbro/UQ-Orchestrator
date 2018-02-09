
interface SelectableList<T> {
  items: T[];
  selected: T[];
}

type IsSelectable<T> = (item: T) => boolean;

export const select = <T>(selectableList: SelectableList<T>, item: T): SelectableList<T> => {
  throw 'not implemented';
};

export const toggleSelectAll = <T>(
  selectableList: SelectableList<T>,
  isSelectable: IsSelectable<T>
): SelectableList<T> => {
  throw 'not implemented';
};

export const pruneUnselectable = <T>(
  selectableList: SelectableList<T>,
  isSelectable: IsSelectable<T>
): SelectableList<T> => {
  throw 'not implemented';
};

export const pruneNotPresent = <T>(selectableList: SelectableList<T>): SelectableList<T> => {
  throw 'not implemented';
};

export const prune = <T>(
  selectableList: SelectableList<T>,
  isSelectable: IsSelectable<T>
): SelectableList<T> => {
  return pruneUnselectable(pruneNotPresent(selectableList), isSelectable);
};

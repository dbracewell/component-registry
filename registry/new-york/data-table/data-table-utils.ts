export function defaultSortFn<T>(a: T[keyof T], b: T[keyof T]) {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  return a < b ? -1 : 1;
}

export function defaultFilterFn<T>(a: T[keyof T], filter: T[keyof T]) {
  if (!filter) return true;
  if (typeof a === "string" && typeof filter === "string") {
    return a.toLowerCase() === filter.toLowerCase();
  }
  return a === filter;
}

export function startsWithFilterFn(a: string, filter: string) {
  if (!filter) return true;
  return a.toLowerCase().startsWith(filter.toLowerCase());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function doGroupBy<T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K,
): [string, T[]][] {
  return Object.entries(
    array.reduce(
      (acc, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
      },
      {} as Record<T[K], T[]>,
    ),
  );
}

import { useCallback, useState } from "react";

export const useSorting = <T extends object>(initialSortColumn?: keyof T) => {
   const [sortColumn, setSortColumn] = useState<
      [keyof T, "asc" | "desc"] | undefined
   >(() => (initialSortColumn ? [initialSortColumn, "asc"] : undefined));

   const toggleSort = useCallback(
      (column: keyof T) => {
         setSortColumn((pair) => {
            if (pair) {
               const [key, dir] = pair;
               if (key === column) {
                  return [key, dir === "asc" ? "desc" : "asc"];
               }
            }
            return [column, "asc"];
         });
      },
      [setSortColumn]
   );

   const getSortDirection = useCallback(
      (column: keyof T) => {
         if (sortColumn) {
            const [key, dir] = sortColumn;
            return key === column ? { dir } : undefined;
         }
         return undefined;
      },
      [sortColumn]
   );

   return { sortColumn, toggleSort, getSortDirection };
};

import type { ColumnDef } from "@/registry/new-york/data-table/data-table-types";
import {
   defaultFilterFn,
   defaultSortFn,
   doGroupBy,
   startsWithFilterFn,
} from "@/registry/new-york/data-table/data-table-utils";
import { useMemo } from "react";

export const useData = <T extends object, K extends keyof T = keyof T>({
   data,
   filters,
   sortColumn,
   columns,
   groupBy,
}: {
   data: T[];
   filters?: Record<K, T[K]>;
   sortColumn?: [K, "asc" | "desc"];
   columns: ColumnDef<T>[];
   groupBy?: K;
}) => {
   const rows = useMemo(() => {
      let rows = data.map((row) => ({ ...row }));

      if (filters) {
         const activeFilters = Object.entries(filters).map(([key, value]) => {
            const columnDef = columns.find(
               (column) => column.accessorKey === key
            );
            const columnFilterFn = columnDef?.filterFn;
            let filterFn: (value: T[K], filter: T[K]) => boolean =
               defaultFilterFn;
            if (columnFilterFn && typeof columnFilterFn === "string") {
               filterFn = (a: T[K], filter: T[K]) =>
                  startsWithFilterFn(String(a), String(filter));
            } else if (columnFilterFn !== undefined) {
               filterFn = defaultFilterFn;
            }

            return {
               key: key as K,
               fn: filterFn,
               value: value as T[K],
            };
         });

         if (activeFilters.length > 0) {
            rows = rows.filter((row) => {
               for (const { key, fn, value } of activeFilters) {
                  if (!fn(row[key], value)) {
                     return false;
                  }
               }
               return true;
            });
         }

         return rows;
      }

      if (sortColumn) {
         const columnDef = columns.find(
            (column) => column.accessorKey === sortColumn[0]
         );
         const sortFn = columnDef?.sortFn ?? defaultSortFn;
         return rows.sort((a, b) => {
            const sortDirection = sortColumn[1];
            const key = sortColumn[0];
            const aValue = a[key];
            const bValue = b[key];
            const order = sortFn(aValue, bValue);
            if (sortDirection === "asc") {
               return order;
            }
            return -order;
         });
      }

      return rows;
   }, [data, sortColumn, columns, filters]);

   const groupedByData = useMemo(() => {
      if (groupBy) {
         return doGroupBy(rows, groupBy);
      }
      return undefined;
   }, [groupBy, rows]);

   return { rows, groupedByData };
};

import { omitFields } from "@/registry/new-york/data-table/type-utils";
import { useCallback, useState } from "react";

export const useFilters = <T extends object, K extends keyof T = keyof T>() => {
   const [filters, setFilters] = useState<Record<K, T[K]>>();
   const setFilter = useCallback(
      (key: K, value: T[K] | undefined) => {
         if (value === undefined) {
            setFilters((prev) =>
               prev
                  ? (omitFields(prev ?? {}, [key]) as Record<K, T[K]>)
                  : undefined
            );
         } else {
            setFilters(
               (prev) =>
                  ({
                     ...prev,
                     [key]: value,
                  } as Record<K, T[K]>)
            );
         }
      },
      [setFilters]
   );

   const getFilter = useCallback(
      (key: K) => {
         if (filters) {
            return filters[key];
         }
         return undefined;
      },
      [filters]
   );

   return { filters, getFilter, setFilter };
};

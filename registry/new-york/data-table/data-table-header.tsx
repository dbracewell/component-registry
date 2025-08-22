import type {
   StyleOptions,
   ColumnDef,
} from "@/registry/new-york/data-table/data-table-types";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { capitalize } from "@/registry/new-york/data-table/text-utils";

export const TableHeader = <T extends object>({
   columns,
   appearance,
   toggleSort,
   getSortDirection,
}: {
   columns: ColumnDef<T>[];
   appearance?: StyleOptions;
   toggleSort: (column: keyof T) => void;
   getSortDirection: (column: keyof T) => { dir: "asc" | "desc" } | undefined;
}) => {
   return (
      <thead>
         <tr className={appearance?.headerRow}>
            {columns.map((c) => {
               const sortDirection = getSortDirection(c.accessorKey)?.dir;
               const isSorted = !!sortDirection;

               return (
                  <th
                     key={c.accessorKey as string}
                     style={{
                        width: c.size ? `${c.size}px` : undefined,
                        padding: appearance?.cellPadding,
                     }}
                     className={appearance?.headerCell}
                  >
                     <div
                        className={cn(
                           "group flex w-full items-center",
                           c.headerClassName
                        )}
                        style={{ justifyContent: c.align ? c.align : "left" }}
                     >
                        {c.header ?? capitalize(c.accessorKey as string)}
                        {c.sortable && (
                           <button
                              onClick={() => toggleSort(c.accessorKey)}
                              type="button"
                              className={cn(
                                 "ml-1 h-full rounded-lg p-0.25 hover:bg-white/70 dark:hover:bg-white/20 [&_svg]:size-4",
                                 !isSorted &&
                                    "opacity-0 group-hover:opacity-100",
                                 c.sortButtonClassName
                              )}
                           >
                              {sortDirection !== "desc" && <ArrowDownIcon />}
                              {sortDirection === "desc" && <ArrowUpIcon />}
                           </button>
                        )}
                     </div>
                  </th>
               );
            })}
         </tr>
      </thead>
   );
};

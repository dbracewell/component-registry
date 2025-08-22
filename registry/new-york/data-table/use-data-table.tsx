import { cn } from "@/lib/utils";
import { TableBody } from "@/registry/new-york/data-table/data-table-body";
import { TableHeader } from "@/registry/new-york/data-table/data-table-header";
import type {
   ColumnDef,
   FooterRenderer,
   GroupByRenderer,
   SecondaryRowRenderer,
   StyleOptions,
} from "@/registry/new-york/data-table/data-table-types";
import { useData } from "@/registry/new-york/data-table/use-data";
import { useFilters } from "@/registry/new-york/data-table/use-filters";
import { useSorting } from "@/registry/new-york/data-table/use-sorting";

export function useDataTable<T extends object>({
   columns,
   data,
   secondaryRowRenderer,
   groupBy,
   groupByRenderer,
   appearance,
   footerRenderer,
   initialSortColumn,
}: {
   appearance?: StyleOptions;
   columns: ColumnDef<T>[];
   data: T[];
   groupBy?: keyof T;
   groupByRenderer?: GroupByRenderer<T>;
   secondaryRowRenderer?: SecondaryRowRenderer<T>;
   footerRenderer?: FooterRenderer<T>;
   initialSortColumn?: keyof T;
}) {
   const { getFilter, setFilter, filters } = useFilters<T>();
   const { sortColumn, toggleSort, getSortDirection } =
      useSorting<T>(initialSortColumn);
   const { rows, groupedByData } = useData({
      data,
      filters,
      sortColumn,
      columns,
      groupBy,
   });

   const DataTable = () => (
      <div
         className={cn(
            "mb-5 overflow-x-auto rounded-lg border",
            appearance?.container
         )}
      >
         <table className={cn("w-full border-spacing-0", appearance?.table)}>
            <TableHeader
               columns={columns}
               appearance={appearance}
               getSortDirection={getSortDirection}
               toggleSort={toggleSort}
            />
            <TableBody
               columns={columns}
               groupByData={groupedByData}
               rows={rows}
               groupByRenderer={groupByRenderer}
               secondaryRowRenderer={secondaryRowRenderer}
               footerRenderer={footerRenderer}
               appearance={appearance}
            />
         </table>
      </div>
   );

   return {
      toggleSort,
      setFilter,
      DataTable,
      getFilter,
   };
}

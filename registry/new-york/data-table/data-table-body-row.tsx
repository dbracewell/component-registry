import type {
   StyleOptions,
   ColumnDef,
} from "@/registry/new-york/data-table/data-table-types";
import { cn } from "@/lib/utils";

export function TableBodyRow<T extends object>({
   row,
   appearance,
   columns,
   index,
   secondaryRowRender,
}: {
   row: T;
   appearance?: StyleOptions;
   columns: ColumnDef<T>[];
   index: number;
   secondaryRowRender?: (row: T) => React.ReactNode;
}) {
   return (
      <>
         <tr
            className={cn(
               appearance?.bodyRow,
               index % 2 === 0
                  ? appearance?.bodyEvenRow
                  : appearance?.bodyOddRow
            )}
         >
            {columns.map((c) => (
               <td
                  key={c.accessorKey as string}
                  className={cn(
                     "justify-self-center align-middle",
                     appearance?.bodyCell,
                     c.cellClassName
                  )}
                  style={{
                     padding: appearance?.cellPadding,
                     textAlign: c.align,
                  }}
               >
                  {c.cell ? c.cell({ row }) : <>{row[c.accessorKey]}</>}
               </td>
            ))}
         </tr>
         {secondaryRowRender !== undefined &&
            secondaryRowRender(row) !== null && (
               <tr className={appearance?.secondaryRow}>
                  <td
                     colSpan={columns.length}
                     className={appearance?.secondaryCell}
                     style={{ padding: appearance?.cellPadding }}
                  >
                     {secondaryRowRender(row)}
                  </td>
               </tr>
            )}
      </>
   );
}

"use client";

import { ColumnDef } from "@/registry/new-york/data-table/data-table-types";
import { useDataTable } from "@/registry/new-york/data-table/use-data-table";
import { Input } from "@/registry/new-york/ui/input";

export const DataTableExample = () => {
   type Product = {
      name: string;
      price: number;
      quantity: number;
   };
   const columns: ColumnDef<Product>[] = [
      {
         accessorKey: "name",
         sortable: true,
         filterFn: "startsWith",
      },
      {
         accessorKey: "price",
         sortable: true,
         cellClassName: "tabular-nums",
         cell: ({ row }) => `$${row.price}`,
      },
      {
         accessorKey: "quantity",
         sortable: true,
      },
   ];
   const { getFilter, setFilter, DataTable } = useDataTable({
      columns,
      data: [
         { name: "Eggs", price: 6.99, quantity: 1 },
         { name: "Milk", price: 2.99, quantity: 10 },
         { name: "Broccoli", price: 1.49, quantity: 100 },
      ],
      appearance: {
         container: "w-[350px]",
         headerRow: "bg-zinc-900",
         cellPadding: 5,
         bodyOddRow: "bg-zinc-800",
         footerRow: "bg-zinc-900",
      },
      initialSortColumn: "name",
      footerRenderer: (rows) => [
         {},
         {
            className: "tabular-nums",
            node: `$${rows.map((r) => r.price).reduce((a, v) => a + v, 0)}`,
         },
         { node: rows.map((r) => r.quantity).reduce((a, v) => a + v, 0) },
      ],
   });
   return (
      <div>
         <div className="flex flex-col gap-1 justify-self-start w-[350px]">
            <span>Name</span>
            <Input
               className="w-[150px]"
               value={getFilter("name") ?? ""}
               onChange={(e) => setFilter("name", e.target.value)}
            />
         </div>
         <DataTable />
      </div>
   );
};

export type StyleOptions = {
   container?: string;
   table?: string;
   headerRow?: string;
   headerCell?: string;
   bodyRow?: string;
   bodyEvenRow?: string;
   bodyOddRow?: string;
   bodyCell?: string;
   cellPadding?: number;
   groupByRow?: string;
   groupByCell?: string;
   secondaryRow?: string;
   secondaryCell?: string;
   footerRow?: string;
   footerCell?: string;
};

export type GroupByRenderer<T extends object> = (
   key: keyof T,
   rows: T[]
) => { className?: string; node: React.ReactNode }[];

export type FooterRenderer<T extends object> = (
   rows: T[]
) => { className?: string; node?: React.ReactNode }[];

export type SecondaryRowRenderer<T extends object> = (
   row: T
) => React.ReactNode;

type _ColumnDef<T extends object, K extends keyof T = keyof T> = {
   accessorKey: K;
   header?: string | React.ReactNode;
   cell?: ({ row }: { row: T }) => React.ReactNode;
   size?: number;
   align?: "center" | "left" | "right";
   sortable?: boolean;
   sortButtonClassName?: string;
   sortFn?: (a: T[K], b: T[K]) => number;
   filterFn?: ((value: T[K], filter: T[K]) => boolean) | "startsWith";
   headerClassName?: string;
   cellClassName?: string;
};

export type ColumnDef<T extends object> = {
   [K in keyof T]-?: _ColumnDef<T, K>;
}[keyof T];

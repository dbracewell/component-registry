import type {
   ColumnDef,
   FooterRenderer,
   GroupByRenderer,
   SecondaryRowRenderer,
   StyleOptions,
} from "@/registry/new-york/data-table/data-table-types";
import { cn } from "@/lib/utils";
import { TableBodyRow } from "./data-table-body-row";
import { Fragment } from "react";

export const TableBody = <T extends object>({
   columns,
   groupByData,
   rows,
   groupByRenderer,
   secondaryRowRenderer,
   footerRenderer,
   appearance,
}: {
   columns: ColumnDef<T>[];
   groupByData?: [string, T[]][];
   rows: T[];
   groupByRenderer?: GroupByRenderer<T>;
   secondaryRowRenderer?: SecondaryRowRenderer<T>;
   footerRenderer?: FooterRenderer<T>;
   appearance?: StyleOptions;
}) => {
   const isEmpty = rows.length === 0;
   return (
      <tbody>
         {!isEmpty && groupByData && (
            <GroupByBody<T>
               columns={columns}
               groupByData={groupByData}
               groupByRenderer={groupByRenderer}
               appearance={appearance}
            />
         )}
         {!isEmpty &&
            !groupByData &&
            rows.map((row, index) => (
               <TableBodyRow
                  key={index}
                  index={index}
                  columns={columns}
                  appearance={appearance}
                  row={row}
                  secondaryRowRender={secondaryRowRenderer}
               />
            ))}
         {!isEmpty && footerRenderer && (
            <Footer
               columns={columns}
               appearance={appearance}
               rows={rows}
               footerRenderer={footerRenderer}
            />
         )}
         {isEmpty && (
            <tr className={appearance?.bodyRow}>
               <td
                  colSpan={columns.length}
                  className={cn("text-lg font-medium", appearance?.bodyCell)}
                  style={{ padding: 50, textAlign: "center" }}
               >
                  No Results
               </td>
            </tr>
         )}
      </tbody>
   );
};

const Footer = <T extends object>({
   columns,
   rows,
   footerRenderer,
   appearance,
}: {
   columns: ColumnDef<T>[];
   rows: T[];
   footerRenderer?: FooterRenderer<T>;
   appearance?: StyleOptions;
}) => {
   if (!footerRenderer) {
      return null;
   }
   const FooterColumns = footerRenderer(rows).map((cell, index) => (
      <td
         key={index}
         className={cn(appearance?.footerCell, cell.className)}
         style={{ padding: appearance?.cellPadding }}
      >
         {cell.node}
      </td>
   ));
   while (FooterColumns.length < columns.length) {
      FooterColumns.push(
         <td
            key={FooterColumns.length + 1}
            className={appearance?.footerCell}
            style={{ padding: appearance?.cellPadding }}
         ></td>
      );
   }
   return <tr className={appearance?.footerRow}>{FooterColumns}</tr>;
};

const GroupByBody = <T extends object>({
   groupByData,
   columns,
   groupByRenderer,
   appearance,
   secondaryRowRenderer,
}: {
   groupByData: [string, T[]][];
   columns: ColumnDef<T>[];
   groupByRenderer?: GroupByRenderer<T>;
   appearance?: StyleOptions;
   secondaryRowRenderer?: SecondaryRowRenderer<T>;
}) => {
   return (
      <>
         {groupByData?.map(([key, values]) => (
            <Fragment key={key}>
               <GroupByHeader
                  groupByKey={key}
                  values={values}
                  columns={columns}
                  groupByRenderer={groupByRenderer}
                  appearance={appearance}
               />
               {values.map((row, index) => {
                  return (
                     <TableBodyRow
                        key={index}
                        index={index}
                        columns={columns}
                        appearance={appearance}
                        row={row}
                        secondaryRowRender={secondaryRowRenderer}
                     />
                  );
               })}
            </Fragment>
         ))}
      </>
   );
};

const GroupByHeader = <T extends object>({
   groupByKey,
   values,
   columns,
   groupByRenderer,
   appearance,
}: {
   groupByKey: string;
   values: T[];
   columns: ColumnDef<T>[];
   groupByRenderer?: GroupByRenderer<T>;
   appearance?: StyleOptions;
}) => {
   let HeaderColumns = [
      <td
         key={groupByKey}
         colSpan={columns.length}
         className={appearance?.groupByCell}
         style={{ padding: appearance?.cellPadding }}
      >
         {groupByKey}
      </td>,
   ];

   if (groupByRenderer) {
      HeaderColumns = groupByRenderer(groupByKey as keyof T, values).map(
         (node, index) => (
            <td
               key={index}
               className={cn(appearance?.groupByCell, node.className)}
               style={{
                  padding: appearance?.cellPadding,
               }}
            >
               {node.node}
            </td>
         )
      );
      while (HeaderColumns.length < columns.length) {
         HeaderColumns.push(
            <td
               key={HeaderColumns.length + 1}
               className={cn(appearance?.groupByCell)}
               style={{
                  padding: appearance?.cellPadding,
               }}
            ></td>
         );
      }
   }

   return <tr className={appearance?.groupByRow}>{HeaderColumns}</tr>;
};

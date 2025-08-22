import { ComponentExample } from "@/components/component-example";
import { DataTableExample } from "@/examples/data-table";

const DataTablePage = () => {
   return (
      <ComponentExample
         title="A Data Table"
         description="A reusable data table component that allows for grouping, footers, and secondary rows"
         name="data-table"
         className="justify-center"
      >
         <DataTableExample />
      </ComponentExample>
   );
};

export default DataTablePage;

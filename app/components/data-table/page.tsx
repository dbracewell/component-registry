import { ComponentExample } from "@/components/component-example";
import { DataTableExample } from "@/examples/data-table";
import code from "./data-table.json";

const DataTablePage = () => {
   return (
      <ComponentExample
         title="A Data Table"
         description="A reusable data table component that allows for grouping, footers, and secondary rows"
         name="data-table"
         className="justify-center"
         code={code.code}
      >
         <DataTableExample />
      </ComponentExample>
   );
};

export default DataTablePage;

import { ComponentExample } from "@/components/component-example";
import { NumberInputExample } from "@/examples/number-input";

const NumberInputPage = () => {
   return (
      <ComponentExample
         title="A Number Input Component"
         description="An Input component that restricts the input to only numbers with optional min and max values"
         name="number-input"
         className="justify-center"
      >
         <NumberInputExample />
      </ComponentExample>
   );
};

export default NumberInputPage;

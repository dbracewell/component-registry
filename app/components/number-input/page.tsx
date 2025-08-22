import { ComponentExample } from "@/components/component-example";
import { NumberInputExample } from "@/examples/number-input";
import code from "./number-input.json";

const NumberInputPage = () => {
   return (
      <ComponentExample
         title="A Number Input Component"
         description="An Input component that restricts the input to only numbers with optional min and max values"
         name="number-input"
         className="justify-center"
         code={code.code}
      >
         <NumberInputExample />
      </ComponentExample>
   );
};

export default NumberInputPage;

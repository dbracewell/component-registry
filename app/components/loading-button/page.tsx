"use client";

import { ComponentExample } from "@/components/component-example";
import { LoadingButtonExample } from "@/examples/loading-button";
import code from "./loading-button.json";

const NumberInputPage = () => {
   return (
      <ComponentExample
         title="A Loading Button"
         description="A button that has a built-in loading state"
         name="loading-button"
         className="justify-center"
         code={code.code}
      >
         <LoadingButtonExample />
      </ComponentExample>
   );
};

export default NumberInputPage;

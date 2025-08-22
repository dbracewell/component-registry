import { ComponentExample } from "@/components/component-example";
import { ConfirmationButtonExample } from "@/examples/confirmation-button";
import React from "react";
import code from "./confirmation-button.json";

const ConfirmationButtonPage = () => {
   return (
      <ComponentExample
         title="Confirmation Button"
         description="A button that confirms whether or not the user wants to perform an operation"
         name="confirmation-button"
         className="justify-center"
         code={code.code}
      >
         <ConfirmationButtonExample />
      </ComponentExample>
   );
};

export default ConfirmationButtonPage;

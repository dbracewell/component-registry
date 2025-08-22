import { ComponentExample } from "@/components/component-example";
import { ConfirmationButtonExample } from "@/examples/confirmation-button";
import React from "react";

const ConfirmationButtonPage = () => {
   return (
      <ComponentExample
         title="Confirmation Button"
         description="A button that confirms whether or not the user wants to perform an operation"
         name="confirmation-button"
         className="justify-center"
      >
         <ConfirmationButtonExample />
      </ComponentExample>
   );
};

export default ConfirmationButtonPage;

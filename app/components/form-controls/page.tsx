import { ComponentExample } from "@/components/component-example";
import { FormControlsExample } from "@/examples/form-controls";
import React from "react";

const FormControlsPage = () => {
   return (
      <ComponentExample
         title="Form Controls"
         name="form-controls"
         description="A reusable set of ready made form fields for shadcn form component"
      >
         <FormControlsExample />
      </ComponentExample>
   );
};

export default FormControlsPage;

import { ConfirmationButton } from "@/registry/new-york/confirmation-button/confirmation-button";
import { Trash2Icon } from "lucide-react";
import React from "react";

export const ConfirmationButtonExample = () => {
   const action = async () => {
      "use server";
      await new Promise((resolve) => setTimeout(resolve, 1000));
   };

   return (
      <div>
         <ConfirmationButton action={action}>
            <Trash2Icon className="mr-1" />
            Delete
         </ConfirmationButton>
      </div>
   );
};

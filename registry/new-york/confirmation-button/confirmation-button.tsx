"use client";
import { LoadingButton } from "@/registry/new-york/loading-button/loading-button";
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/registry/new-york/ui/alert-dialog";
import { Button } from "@/registry/new-york/ui/button";
import React, { useState, useTransition } from "react";

type ConfirmationButtonProps = React.ComponentProps<typeof Button> & {
   action: () => Promise<void>;
   confirmButtonText?: string;
   cancelButtonText?: string;
   confirmTitle?: string;
   confirmDescription?: string;
};

export const ConfirmationButton = ({
   action,
   confirmButtonText = "Confirm",
   cancelButtonText = "Cancel",
   confirmDescription = "This action cannot be undone",
   confirmTitle = "Are you sure you want to perform this operation?",
   ...props
}: ConfirmationButtonProps) => {
   const [isLoading, startTransition] = useTransition();
   const [isOpen, setIsOpen] = useState(false);

   function performAction() {
      startTransition(async () => {
         await action();
         setIsOpen(false);
      });
   }

   return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
         <AlertDialogTrigger asChild>
            <Button
               {...props}
               variant={props.variant ? props.variant : "destructive"}
            >
               {props.children ? props.children : confirmButtonText}
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
               <AlertDialogDescription>
                  {confirmDescription ?? ""}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
               <LoadingButton
                  isLoading={isLoading}
                  {...props}
                  variant={props.variant ? props.variant : "destructive"}
                  onClick={performAction}
               >
                  {confirmButtonText}
               </LoadingButton>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

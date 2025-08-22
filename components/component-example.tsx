"use client";
import { CodePreview } from "@/components/code-preview";
import { CopyInstall } from "@/components/copy-install";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export const ComponentExample = ({
   title,
   description,
   name,
   children,
   className,
}: {
   title: string;
   description: string;
   name: string;
   children: React.ReactNode;
   className?: string;
}) => {
   const [view, setView] = useState<"preview" | "code">("preview");
   return (
      <main className="flex flex-col flex-1">
         <div className="flex items-center">
            <Button variant="ghost" asChild>
               <Link href="/">
                  <ChevronLeftIcon /> Back
               </Link>
            </Button>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setView("preview")}>
               Preview
            </Button>
            <Button variant="ghost" onClick={() => setView("code")}>
               Code
            </Button>
         </div>
         <div className="flex flex-col gap-4 border rounded-lg p-4 h-[600px] relative mb-5">
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-2">
                  <h2 className="text-base text-muted-foreground sm:pl-3">
                     {title}
                  </h2>
                  <p className="text-xs text-muted-foreground sm:pl-3">
                     {description}
                  </p>
               </div>
               <OpenInV0Button name={name} className="w-fit" />
            </div>
            <div className="flex flex-col flex-1 overflow-auto">
               {view === "preview" ? (
                  <div
                     className={cn(
                        "grow flex flex-col gap-3 items-center  w-full h-full",
                        className
                     )}
                  >
                     {children}
                  </div>
               ) : (
                  <CodePreview componentName={name} />
               )}
            </div>
         </div>
         <CopyInstall component={name} />
      </main>
   );
};

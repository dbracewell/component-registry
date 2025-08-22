"use client";
import { Button } from "@/registry/new-york/ui/button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const CodePreview = ({ code }: { code: string }) => {
   const [copying, setCopying] = useState(false);
   useEffect(() => {
      if (copying) {
         setTimeout(() => setCopying(false), 1000);
      }
   }, [copying, setCopying]);

   return (
      <div className="grow bg-neutral-900 border w-full relative">
         <Button
            variant="ghost"
            className="p-1! h-7! absolute top-3 right-3"
            disabled={copying}
            onClick={() => {
               setCopying(true);
               navigator.clipboard.writeText(code);
            }}
         >
            {copying ? <CopyCheckIcon /> : <CopyIcon />}
         </Button>
         <code className="whitespace-pre font-mono text-sm">{code}</code>
      </div>
   );
};

"use client";
import { Button } from "@/registry/new-york/ui/button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const CodePreview = ({ componentName }: { componentName: string }) => {
   const [sourceCode, setSourceCode] = useState("");
   const [copying, setCopying] = useState(false);
   useEffect(() => {
      if (copying) {
         setTimeout(() => setCopying(false), 1000);
      }
   }, [copying, setCopying]);

   useEffect(() => {
      fetch(`/api/component/${componentName}`).then(async (res) => {
         if (res.ok) {
            setSourceCode(await res.text());
         } else {
            setSourceCode("");
         }
      });
   }, [setSourceCode, componentName]);

   return (
      <div className="grow bg-neutral-900 border w-full relative">
         <Button
            variant="ghost"
            className="p-1! h-7! absolute top-3 right-3"
            disabled={copying}
            onClick={() => {
               setCopying(true);
               navigator.clipboard.writeText(sourceCode);
            }}
         >
            {copying ? <CopyCheckIcon /> : <CopyIcon />}
         </Button>
         <code className="whitespace-pre font-mono text-sm">{sourceCode}</code>
      </div>
   );
};

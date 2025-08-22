import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import { CopyCheckIcon, CopyIcon, TerminalIcon } from "lucide-react";
import { useEffect, useState } from "react";

type cmd = "pnpm" | "npm" | "bun" | "yarn";

export const CopyInstall = ({ component }: { component: string }) => {
   const [active, setActive] = useState<cmd>("pnpm");
   const [copying, setCopying] = useState(false);

   useEffect(() => {
      if (copying) {
         setTimeout(() => setCopying(false), 1000);
      }
   }, [copying, setCopying]);

   const SITE_URL = process.env.NEXT_PUBLIC_URL!;

   const options = [
      {
         name: "pnpm",
         copy: `pnpm dlx shadcn@latest add ${SITE_URL}/r/${component}.json`,
      },
      {
         name: "npm",
         copy: `npx shadcn@latest add ${SITE_URL}/r/${component}.json`,
      },
      {
         name: "yarn",
         copy: `yarn shadcn@latest add ${SITE_URL}/r/${component}.json`,
      },
      {
         name: "bun",
         copy: `bunx --bun shadcn@latest add ${SITE_URL}/r/${component}.json`,
      },
   ] as { name: cmd; copy: string }[];

   return (
      <div className="bg-zinc-900 border rounded-md text-muted-foreground text-sm">
         <div className="flex items-center justify-between border-b  px-2">
            <div className="flex items-center gap-1 py-1">
               <TerminalIcon className="size-4" />
               {options.map((option) => (
                  <Button
                     key={option.name}
                     variant="ghost"
                     onClick={() => setActive(option.name)}
                     className={cn(
                        "p-1! h-7!",
                        active === option.name &&
                           "border-zinc-500 border text-white"
                     )}
                  >
                     {option.name}
                  </Button>
               ))}
            </div>
            <Button
               variant="ghost"
               className="p-1! h-7!"
               disabled={copying}
               onClick={() => {
                  setCopying(true);
                  navigator.clipboard.writeText(
                     options.find((o) => o.name === active)!.copy
                  );
               }}
            >
               {copying ? <CopyCheckIcon /> : <CopyIcon />}
            </Button>
         </div>
         <div className="p-2">
            {options.find((o) => o.name === active)!.copy}
         </div>
      </div>
   );
};

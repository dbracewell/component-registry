"use client";
import { Button } from "@/registry/new-york/ui/button";
import Link from "next/link";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
   const components = [
      "number-input",
      "loading-button",
      "data-table",
      "form-controls",
      "confirmation-button",
   ].sort();

   return (
      <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
         <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">
               Custom Registry
            </h1>
            <p className="text-muted-foreground">
               A custom registry for distributing code using shadcn.
            </p>
         </header>
         <main className="flex flex-col flex-1 gap-8">
            <ul className="flex flex-col gap-2">
               {components.map((c) => (
                  <li key={c}>
                     <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                     >
                        <Link href={`/components/${c}`}>
                           {c
                              .split("-")
                              .map((p) => p[0].toUpperCase() + p.slice(1))
                              .join(" ")}
                        </Link>
                     </Button>
                  </li>
               ))}
            </ul>
         </main>
      </div>
   );
}

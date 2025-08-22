import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";

const COMPONENT_START = "() => {";

export async function GET(
   _req: NextRequest,
   { params }: { params: { name: string } }
) {
   const { name } = params;
   const filePath = path.join(process.cwd(), "examples", name, "index.tsx");
   console.log(filePath);
   const fileContents = (await fs.readFile(filePath, "utf-8")).trim();

   const codeStart = fileContents.indexOf(COMPONENT_START);
   if (codeStart < 0) {
      return new Response("", {
         headers: { "Content-Type": "text/plain" },
      });
   }

   const code = fileContents.slice(
      codeStart + COMPONENT_START.length,
      fileContents.length - 3
   );

   return new Response(code, {
      headers: { "Content-Type": "text/plain" },
   });
}

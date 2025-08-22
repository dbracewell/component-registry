import { promises as fs } from "fs";
import path from "path";
import components from "@/data/components.json";

const COMPONENT_START = "() => {";

const main = async () => {
   for (const name of components) {
      const filePath = path.join(process.cwd(), "examples", name, "index.tsx");
      const fileContents = (await fs.readFile(filePath, "utf-8")).trim();
      const codeStart = fileContents.indexOf(COMPONENT_START);
      if (codeStart < 0) {
         continue;
      }

      const code = fileContents.slice(
         codeStart + COMPONENT_START.length,
         fileContents.length - 3
      );

      const outFile = path.join(
         process.cwd(),
         "app",
         "components",
         name,
         `${name}.json`
      );
      fs.writeFile(
         outFile,
         JSON.stringify({
            code: code,
         })
      );
   }
};

main();

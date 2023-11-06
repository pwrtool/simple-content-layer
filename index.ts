import powertool from "@pwrtool/kit";
import { LocalDirectory } from "./lib/reader";
import { parseFilesInDirectory } from "./lib/parse";
import { getContentRoutes } from "./lib/route";
import { getOutputFiles, getListFile } from "./lib/output";
import fs from "node:fs";

powertool([
  {
    name: "default",
    function: async (IO, CliArgs, Config) => {
      const argsKeys = ["input", "output"];
      const argValues = [];

      for (const key of argsKeys) {
        if (CliArgs.exists(key)) {
          argValues.push(CliArgs.get(key));
          continue;
        }
        if (Config.exists(key)) {
          argValues.push(Config.get(key));
          continue;
        }

        IO.error(`${key} could not be found in cli args or config`);
        break;
      }

      const [input, output] = argValues;

      // ensure output and input dirs exist
      if (!fs.existsSync(input)) {
        IO.error(`input directory ${input} does not exist`);
      }
      if (!fs.existsSync(output)) {
        IO.error(`output directory ${output} does not exist`);
      }

      const filesystem = new LocalDirectory(input);
      const contentFiles = parseFilesInDirectory(filesystem);
      const contentRoutes = getContentRoutes(contentFiles);

      const outputFiles = getOutputFiles(contentRoutes);
      const listFile = getListFile(contentRoutes);

      fs.writeFileSync(`${output}/list.json`, JSON.stringify(listFile));

      // iterate through outputFiles and write to disk
      for (const [key, outputFile] of outputFiles) {
        console.log(key);
        console.log(output);
        fs.writeFileSync(`${output}/${key}`, JSON.stringify(outputFile));
      }
    },
  },
]);

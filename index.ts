import powertool from "@pwrtool/kit";

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
      IO.out(`input: ${input}`);
      IO.out(`output: ${output}`);
    },
  },
]);

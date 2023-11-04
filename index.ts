import powertool from "@pwrtool/kit";

powertool([
  {
    name: "default",
    function: async (IO) => {
      IO.out("Hello world!");
    },
  },
]);

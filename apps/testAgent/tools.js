import { tool } from "langchain";
import * as z from "zod";

const getWeather = tool(
  async ({ city }) => {
    return `🌤️ It's always sunny in ${city}`;
  },
  {
    name: "get_weather",
    description: "Get weather for a city",
    schema: z.object({
      city: z.string(),
    }),
  },
);

const addition = tool(
  async (val1, val2) => {
    return val1 + val2;
  },
  {
    name: "addition",
    description: "add to number's",
    schema: z.object({
      val1: z.number(),
      val2: z.number(),
    }),
  },
);

export { getWeather, addition };

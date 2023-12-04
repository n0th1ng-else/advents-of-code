import { load as loadEnv } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

export const detectYear = async (): Promise<
  [string, "environment" | "system"]
> => {
  const env = await loadEnv();
  const envYear = env.AOC_YEAR || "";
  if (envYear) {
    return [envYear, "environment"];
  }

  const systemYear = new Date().getFullYear();
  return [String(systemYear), "system"];
};

export const detectSessionId = async (): Promise<string> => {
  const env = await loadEnv();
  const token = env.AOC_SESSION_ID || "";
  return token;
};

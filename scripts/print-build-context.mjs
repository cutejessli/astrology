import { readFileSync } from "node:fs";

const indexPreview = readFileSync("src/index.ts", "utf8")
  .split("\n")
  .slice(0, 35)
  .map((line, index) => `${String(index + 1).padStart(2, "0")}: ${line}`)
  .join("\n");

console.log("\n=== Build context diagnostic ===");
console.log(`GITHUB_SHA: ${process.env.GITHUB_SHA ?? "not set"}`);
console.log(`GITHUB_REF: ${process.env.GITHUB_REF ?? "not set"}`);
console.log(`Node: ${process.version}`);
console.log("src/index.ts first 35 lines:");
console.log(indexPreview);
console.log("=== End build context diagnostic ===\n");

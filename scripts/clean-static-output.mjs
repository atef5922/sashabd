import { rm } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd());
const outputDir = path.resolve(root, "out");

if (path.dirname(outputDir) !== root || path.basename(outputDir) !== "out") {
  throw new Error(`Refusing to clean unexpected output path: ${outputDir}`);
}

await rm(outputDir, { recursive: true, force: true });
console.log(`Cleaned static output: ${outputDir}`);

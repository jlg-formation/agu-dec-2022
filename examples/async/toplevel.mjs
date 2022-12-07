import { promises as fs } from "node:fs";

try {
  const files = await fs.readdir(".");
  console.log("files: ", files);

  const content = await fs.readFile(files[0], { encoding: "utf-8" });
  console.log("content: ", content);
} catch (err) {
  console.log("err: ", err);
}

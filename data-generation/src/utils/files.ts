export function ensureFilepathFolder(filePath: string) {
  const path = require("path");
  const dirname = path.dirname(filePath);
  const fs = require("fs");
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export async function saveDataToJSONFile(filePath: string, data: any) {
  const fs = require("fs");
  const util = require("util");
  ensureFilepathFolder(filePath);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function readJSONFile(filePath: string) {
  const fs = require("fs");
  const util = require("util");
  const readFile = util.promisify(fs.readFile);
  const data = await readFile(filePath, "utf8");
  return JSON.parse(data);
}

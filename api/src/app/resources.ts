export async function readResource(fileName: string) {
  const file = getResourceFile(fileName);
  return await file.json();
}

export async function readRawResource(fileName: string) {
  const file = getResourceFile(fileName);
  return await file.text();
}

export function getResourceFile(fileName: string) {
  const path = `./data/${fileName}`;
  return Bun.file(path);
}

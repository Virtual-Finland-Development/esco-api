const memoryCache = new Map<string, any>();

export async function readResource(fileName: string) {
  if (memoryCache.has(fileName)) {
    return memoryCache.get(fileName);
  }
  const dataStoragePath = process.env.DATA_STORAGE_PATH || "./data";
  const path = `${dataStoragePath}/${fileName}`;

  const file = Bun.file(path);
  if (!(await file.exists())) {
    throw new Error(`Resource file ${path} does not exist`);
  }

  // Bun json() is broken: https://github.com/oven-sh/bun/issues/5960
  // const data = await file.json();
  // Use stream() instead:
  const stream = file.stream();
  const data = await Bun.readableStreamToJSON(stream);

  memoryCache.set(fileName, data);

  return data;
}

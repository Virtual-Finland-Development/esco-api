const memoryCache = new Map<string, any>();

export async function readResource(fileName: string) {
  if (memoryCache.has(fileName)) {
    return memoryCache.get(fileName);
  }

  const path = `./data/${fileName}`;
  const file = Bun.file(path);
  const data = await file.json();
  memoryCache.set(fileName, data);

  return data;
}

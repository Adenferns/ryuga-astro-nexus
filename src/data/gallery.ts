// Every img<N>.jpeg in assets/Gallery, keyed by its number. Drop a file in to add a photo.
const modules = import.meta.glob<string>("../assets/Gallery/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
});

const byNum = new Map<number, string>();
for (const [path, url] of Object.entries(modules)) {
  const n = Number(path.match(/img(\d+)/)?.[1]);
  if (n) byNum.set(n, url);
}

export const photo = (n: number) => byNum.get(n) ?? "";

/** Newest (highest number) first. */
export const allPhotos = [...byNum.keys()]
  .sort((a, b) => b - a)
  .map((n) => ({ n, src: byNum.get(n) as string }));

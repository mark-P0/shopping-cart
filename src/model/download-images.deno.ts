import { sleep } from "../utilities.ts";
import { TEMPORARY_HARDCODED_DATA } from "./vehicles.ts";

for (const { id, imageSrc } of TEMPORARY_HARDCODED_DATA) {
  await sleep(1);

  const response = await fetch(imageSrc);
  const buffer = await response.arrayBuffer();

  const filename = `./images/${id}.png`;
  Deno.writeFile(filename, buffer, { mode: 0o644 });

  console.log({ filename });
}

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type Source = {
  _type: string
  _key?: string,
  asset: {
    _ref: string,
    _type: string
  }
}
export const client = createClient({
  projectId: "qi9trivd",
  dataset: "production",
  apiVersion: "2024-01-15",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: Source) =>  builder.image(source);

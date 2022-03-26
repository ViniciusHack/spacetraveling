import * as prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown): prismic.Client {
  const prismicClient = prismic.createClient(process.env.PRISMIC_API_ENDPOINT);
  return prismicClient;
}

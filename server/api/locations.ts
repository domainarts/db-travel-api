import { createClient } from 'db-vendo-client';
import { profile as dbnavProfile } from 'db-vendo-client/p/dbnav/index.js';
import { getQuery } from 'h3';

const client = createClient(dbnavProfile, 'db-travel-api-demo');

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.id) {
    // Suche nach ID (Detailseite)
    try {
      const results = await client.locations(query.id, { results: 1 });
      return results;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return { error: message };
    }
  }
  const search = query.q;
  if (!search || typeof search !== 'string') {
    return { error: 'Missing query parameter q' };
  }
  try {
    const results = await client.locations(search, { results: 10 });
    return results;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { error: message };
  }
});

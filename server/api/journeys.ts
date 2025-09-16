import { createClient } from 'db-vendo-client';
import { profile as dbnavProfile } from 'db-vendo-client/p/dbnav/index.js';
import { getQuery } from 'h3';

const client = createClient(dbnavProfile, 'db-travel-api-demo');

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const from = query.from;
  if (!from || typeof from !== 'string') {
    return { error: 'Missing query parameter from' };
  }

  try {
      const departures = await client.departures(from, { results: 10 });
      return departures;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { error: message };
  }
});

/* @flow */

import path from 'path';
import knex from 'knex';
import { Model } from 'boldr-orm';
import config from '../../config';

const knexOpts = {
  client: 'pg',
  connection: config.db.url,
  searchPath: 'knex,public',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
  },
  debug: config.db.debug,
};

const db = knex(knexOpts);

function initializeDb(): Promise<mixed> {
  Model.knex(db);
  Model.setBasePath(path.join(__dirname, '..', '..', 'models'));
  // prefer ajv validation over partial objection schema assumptions
  // https://github.com/epoberezkin/ajv/issues/410
  Model.pickJsonSchemaProperties = false;
  return db.raw('select 1+1 as result');
}

async function disconnect(db: Object) {
  if (!db) {
    return;
  }
  try {
    await db.destroy();
  } catch (err) {
    throw new Error(err);
  }
}
export default db;

export { disconnect, initializeDb };

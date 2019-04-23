import { METADATA_KEYS } from '../constants';
import { QueriesMetadata, QueryHandlerMetadata } from '../types';
import { getQueryMetadata } from '../utils';

/**
 * decorator used to define a query handler.
 * @param queries  queries that are handled with this query handler.
 */
// tslint:disable-next-line: no-shadowed-variable
export const queries = (...queries: Function[]): ClassDecorator => (
  target: Function,
) => {
  // query handler metadata.
  const newMetadata: QueryHandlerMetadata = {
    name: target.name,
    handler: target,
  };

  // get queries metadata already registred if any.
  const queriesMetadata: QueriesMetadata =
    Reflect.getMetadata(METADATA_KEYS.queries, Reflect) || new Map();

  // setup query handler for queries
  // overwrite if already setup
  // last query handler win. (good for testing)
  queries.forEach((q) => {
    const queryMetadata = getQueryMetadata(q);
    queriesMetadata.set(queryMetadata.id.valueOf(), newMetadata);
  });

  // define queries metadata on the global Reflect object.
  Reflect.defineMetadata(METADATA_KEYS.queries, queriesMetadata, Reflect);
};

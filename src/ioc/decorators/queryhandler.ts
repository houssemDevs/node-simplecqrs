import { METADATA_KEYS } from '../constants';
import { QueriesMetadata, QueryHandlerMetadata } from '../types';
import { getQueryMetadata } from '../utils';

// tslint:disable-next-line: no-shadowed-variable
export const queries = (...queries: Function[]): ClassDecorator => (
  target: Function,
) => {
  const newMetadata: QueryHandlerMetadata = {
    name: target.name,
    handler: target,
  };

  const queriesMetadata: QueriesMetadata =
    Reflect.getMetadata(METADATA_KEYS.queryHandlers, Reflect) || new Map();

  queries.forEach((q) => {
    const queryMetadata = getQueryMetadata(q);
    queriesMetadata.set(queryMetadata.id.valueOf(), newMetadata);
  });

  Reflect.defineMetadata(METADATA_KEYS.query, queriesMetadata, Reflect);
};

import { METADATA_KEYS } from '../constants';
import { QueryHandlerMetadata } from '../types';
import { getQueryMetadata } from '../utils';

// tslint:disable-next-line: no-shadowed-variable
export const queries = (...queries: Function[]): ClassDecorator => (target: Function) => {
  const newMetadata: QueryHandlerMetadata = {
    name: target.name,
    handler: target,
    queries: queries.map((q) => getQueryMetadata(q)),
  };

  const queryHandlers: Map<string, QueryHandlerMetadata> =
    Reflect.getMetadata(METADATA_KEYS.queryHandlers, Reflect) || new Map();

  if (queryHandlers.has(target.name)) {
    throw new Error(`Query handler already decorated ${target.name}`);
  }

  queryHandlers.set(target.name, newMetadata);

  Reflect.defineMetadata(METADATA_KEYS.queryHandlers, queryHandlers, Reflect);
};

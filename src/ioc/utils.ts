import { METADATA_KEYS } from './constants';
import {
  CommandHandlerMetadata,
  CommandMetadata,
  QueryHandlerMetadata,
  QueryMetadata,
} from './types';

export const getQueriesMetadata = (): QueryMetadata[] =>
  Reflect.getMetadata(METADATA_KEYS.queries, Reflect) || [];

export const getCommandsMetadata = (): CommandMetadata[] =>
  Reflect.getMetadata(METADATA_KEYS.commands, Reflect) || [];

export const getQHMetadata = (): QueryHandlerMetadata[] =>
  Reflect.getMetadata(METADATA_KEYS.queryHandlers, Reflect) || [];

export const getCHMetadata = (): CommandHandlerMetadata[] =>
  Reflect.getMetadata(METADATA_KEYS.commandHandlers, Reflect) || [];

export const getObjectName = (o: any): string =>
  Object.getPrototypeOf(o).constructor.name;

export const getQueryMetadata = (q: any): QueryMetadata => {
  if (!Reflect.hasOwnMetadata(METADATA_KEYS.queries, q)) {
    throw new Error(
      `query ${q.name} has no metadata, you may need to add @query decorator`,
    );
  }
  return Reflect.getMetadata(METADATA_KEYS.queries, q);
};

export const getQueryId = (q: any): Symbol => getQueryMetadata(q).id;

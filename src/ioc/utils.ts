import { METADATA_KEYS } from './constants';
import { CommandHandlerMetadata, CommandMetadata, QueryHandlerMetadata, QueryMetadata } from './types';

export const getQueriesMetadata = (): QueryMetadata[] => Reflect.getMetadata(METADATA_KEYS.queries, Reflect) || [];

export const getCommandsMetadata = (): CommandMetadata[] => Reflect.getMetadata(METADATA_KEYS.commands, Reflect) || [];

export const getQHMetadata = (): Map<string, QueryHandlerMetadata> =>
  Reflect.getMetadata(METADATA_KEYS.queryHandlers, Reflect) || new Map();

export const getCHMetadata = (): Map<string, CommandHandlerMetadata> =>
  Reflect.getMetadata(METADATA_KEYS.commandHandlers, Reflect) || new Map();

export const getObjectName = (o: any): string => Object.getPrototypeOf(o).constructor.name;

export const getObjectConstructor = (o: any): Function => Object.getPrototypeOf(o).constructor;

export const getQueryMetadata = (q: Function): QueryMetadata => {
  const meta: QueryMetadata = Reflect.getMetadata(METADATA_KEYS.queries, q);
  if (meta) {
    return meta;
  }
  throw new Error(`query ${q.name} has no metadata, you may need to add @query decorator`);
};

export const getCommandMetadata = (c: Function): CommandMetadata => {
  const meta: CommandMetadata = Reflect.getMetadata(METADATA_KEYS.commands, c);
  if (meta) {
    return meta;
  }
  throw new Error(`command ${c.name} has no metadata, you may need to add @command decorator`);
};

export const getQueryId = (q: Function): symbol => getQueryMetadata(q).id.valueOf();

export const getCommandId = (c: Function): symbol => getCommandMetadata(c).id.valueOf();

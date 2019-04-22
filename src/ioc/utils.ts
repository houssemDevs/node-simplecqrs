import { METADATA_KEYS } from './constants';
import {
  CommandHandlerMetadata,
  MessageMetadata,
  QueryHandlerMetadata,
} from './types';

export const getQHMetadata = (): Map<string, QueryHandlerMetadata> =>
  Reflect.getMetadata(METADATA_KEYS.queryHandlers, Reflect) || new Map();

export const getCHMetadata = (): Map<string, CommandHandlerMetadata> =>
  Reflect.getMetadata(METADATA_KEYS.commandHandlers, Reflect) || new Map();

export const getQueryMetadata = (q: Function): MessageMetadata => {
  const meta: MessageMetadata = Reflect.getMetadata(METADATA_KEYS.query, q);
  if (meta) {
    return meta;
  }
  throw new Error(
    `query ${q.name} has no metadata, you may need to add @query decorator`,
  );
};

export const getCommandMetadata = (c: Function): MessageMetadata => {
  const meta: MessageMetadata = Reflect.getMetadata(METADATA_KEYS.command, c);
  if (meta) {
    return meta;
  }
  throw new Error(
    `command ${c.name} has no metadata, you may need to add @command decorator`,
  );
};

export const getQueryId = (q: Function): symbol =>
  getQueryMetadata(q).id.valueOf();

export const getCommandId = (c: Function): symbol =>
  getCommandMetadata(c).id.valueOf();

export const getObjectName = (o: any): string => o.constructor.name;

export const getObjectConstructor = (o: any): Function => o.constructor;

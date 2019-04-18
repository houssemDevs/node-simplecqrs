import { METADATA_KEYS } from './constants';
import { CommandMetadata, QueryMetadata } from './types';

export const getQueriesMetadata = (): QueryMetadata[] =>
  Reflect.getMetadata(METADATA_KEYS.queries, Reflect) || [];

export const getCommandsMetadata = (): CommandMetadata[] =>
  Reflect.getMetadata(METADATA_KEYS.commands, Reflect) || [];

export const getObjectName = (o: any): string =>
  Object.getPrototypeOf(o).constructor.name;

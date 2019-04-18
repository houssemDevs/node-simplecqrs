import { METADATA_KEYS } from './constants';
import { CommandMetadata, QueryMetadata } from './types';

export const query = (handler: Function): ClassDecorator => (
  target: Function,
) => {
  const newMetadata = {
    name: target.name,
    query: target,
    handler,
  };

  const queriesMetadata: CommandMetadata[] =
    Reflect.getMetadata(METADATA_KEYS.queries, Reflect) || [];

  Reflect.defineMetadata(
    METADATA_KEYS.queries,
    [...queriesMetadata, newMetadata],
    Reflect,
  );
};

export const command = (handler: Function): ClassDecorator => (
  target: Function,
) => {
  const newMetadata = {
    name: target.name,
    commad: target,
    handler,
  };

  const commandsMetadata: CommandMetadata[] =
    Reflect.getMetadata(METADATA_KEYS.commands, Reflect) || [];

  Reflect.defineMetadata(
    METADATA_KEYS.queries,
    [...commandsMetadata, newMetadata],
    Reflect,
  );
};

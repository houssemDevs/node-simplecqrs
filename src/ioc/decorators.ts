import { decorate, injectable } from 'inversify';
import { METADATA_KEYS } from './constants';
import { CommandMetadata, QueryHandlerMetadata, QueryMetadata } from './types';
import { getQueryMetadata } from './utils';

export const query: ClassDecorator = (target: Function) => {
  const newMetadata: QueryMetadata = {
    name: target.name,
    id: Symbol(target.name),
    handler: undefined,
  };

  Reflect.defineMetadata(METADATA_KEYS.queries, newMetadata, target);
};

export const command = (handler: Function): ClassDecorator => (
  target: Function,
) => {
  const newMetadata: CommandMetadata = {
    name: target.name,
    handler,
  };

  const commandsMetadata: CommandMetadata[] =
    Reflect.getMetadata(METADATA_KEYS.commands, Reflect) || [];

  Reflect.defineMetadata(
    METADATA_KEYS.commands,
    [...commandsMetadata, newMetadata],
    Reflect,
  );
};

export const queryHandler = (...queries: Function[]): ClassDecorator => (
  target: Function,
) => {
  const newMetadata: QueryHandlerMetadata = {
    name: target.name,
    handler: target,
    queries: queries.map((q) => getQueryMetadata(q)),
  };

  const queryHandlers: QueryHandlerMetadata[] =
    Reflect.getMetadata(METADATA_KEYS.queryHandlers, Reflect) || [];

  Reflect.defineMetadata(
    METADATA_KEYS.queryHandlers,
    [...queryHandlers, newMetadata],
    Reflect,
  );

  decorate(injectable(), target);
};

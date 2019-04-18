import { decorate, injectable } from 'inversify';
import { METADATA_KEYS } from './constants';
import { CommandHandlerMetadata, MessageMetadata, QueryHandlerMetadata, QueryMetadata } from './types';
import { getCommandMetadata, getQueryMetadata } from './utils';

export const query: ClassDecorator = (target: Function) => {
  const metadata: MessageMetadata = {
    id: Symbol(target.name),
  };

  Reflect.defineMetadata(METADATA_KEYS.query, metadata, target);
};

export const command: ClassDecorator = (target: Function) => {
  const metadata: MessageMetadata = {
    id: Symbol(target.name),
  };

  Reflect.defineMetadata(METADATA_KEYS.command, metadata, target);
};

export const queryHandler = (...queries: Function[]): ClassDecorator => (target: Function) => {
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

  decorate(injectable(), target);
};

export const commandHandler = (...commands: Function[]): ClassDecorator => (target: Function) => {
  const newMetadata: CommandHandlerMetadata = {
    name: target.name,
    handler: target,
    commands: commands.map((c) => getCommandMetadata(c)),
  };

  const commandHandlers: Map<string, CommandHandlerMetadata> =
    Reflect.getMetadata(METADATA_KEYS.commandHandlers, Reflect) || new Map();

  if (commandHandlers.has(target.name)) {
    throw new Error(`command handler already decorated ${target.name}`);
  }

  commandHandlers.set(target.name, newMetadata);

  Reflect.defineMetadata(METADATA_KEYS.commandHandlers, commandHandlers, Reflect);

  decorate(injectable(), target);
};

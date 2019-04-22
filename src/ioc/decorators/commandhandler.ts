import { METADATA_KEYS } from '../constants';
import { CommandHandlerMetadata } from '../types';
import { getCommandMetadata } from '../utils';

// tslint:disable-next-line: no-shadowed-variable
export const commands = (...commands: Function[]): ClassDecorator => (target: Function) => {
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
};

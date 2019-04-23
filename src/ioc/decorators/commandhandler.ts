import { METADATA_KEYS } from '../constants';
import { CommandHandlerMetadata, CommandsMetadata } from '../types';
import { getCommandMetadata } from '../utils';

// tslint:disable-next-line: no-shadowed-variable
export const commands = (...commands: Function[]): ClassDecorator => (
  target: Function,
) => {
  const newMetadata: CommandHandlerMetadata = {
    name: target.name,
    handler: target,
  };

  const commandsMetadata: CommandsMetadata =
    Reflect.getMetadata(METADATA_KEYS.command, Reflect) || new Map();

  commands.forEach((c) => {
    const commandMetadata = getCommandMetadata(c);
    commandsMetadata.set(commandMetadata.id.valueOf(), newMetadata);
  });

  Reflect.defineMetadata(METADATA_KEYS.command, commandsMetadata, Reflect);
};

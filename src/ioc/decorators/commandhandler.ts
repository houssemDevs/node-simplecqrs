import { METADATA_KEYS } from '../constants';
import { CommandHandlerMetadata, CommandsMetadata } from '../types';
import { getCommandMetadata } from '../utils';

/**
 * decorator used to define a command handler
 * @param commands commands that are handled with the decorated handler
 */
// tslint:disable-next-line: no-shadowed-variable
export const commands = (...commands: Function[]): ClassDecorator => (target: Function) => {
  // new command handler metadata.
  const newMetadata: CommandHandlerMetadata = {
    name: target.name,
    handler: target,
  };

  // get the metadata for commands already registred if any.
  const commandsMetadata: CommandsMetadata = Reflect.getMetadata(METADATA_KEYS.commands, Reflect) || new Map();

  // setup the command handler for the commands
  // replace old command handler if any.
  // the last command handler win.
  commands.forEach(c => {
    const commandMetadata = getCommandMetadata(c);
    commandsMetadata.set(commandMetadata.id.valueOf(), newMetadata);
  });

  // define the commands metadata on the global singleton Reflect object.
  Reflect.defineMetadata(METADATA_KEYS.commands, commandsMetadata, Reflect);
};

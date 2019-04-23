import { METADATA_KEYS } from '../constants';
import { MessageMetadata } from '../types';

/**
 * decorator used to define a command
 * @param target the command object implements ICommand (optional)
 */
export const command: ClassDecorator = (target: Function) => {
  // command metadata.
  const metadata: MessageMetadata = {
    id: Symbol(target.name),
  };

  // setup the command metadata on the class constructor function
  // overwrite if any are defined.
  Reflect.defineMetadata(METADATA_KEYS.command, metadata, target);
};

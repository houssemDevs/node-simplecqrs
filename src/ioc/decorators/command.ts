import { METADATA_KEYS } from '../constants';
import { MessageMetadata } from '../types';

export const command: ClassDecorator = (target: Function) => {
  const metadata: MessageMetadata = {
    id: Symbol(target.name),
  };

  Reflect.defineMetadata(METADATA_KEYS.command, metadata, target);
};

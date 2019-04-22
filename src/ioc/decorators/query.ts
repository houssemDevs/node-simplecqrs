import { METADATA_KEYS } from '../constants';
import { MessageMetadata } from '../types';

export const query: ClassDecorator = (target: Function) => {
  const metadata: MessageMetadata = {
    id: Symbol(target.name),
  };

  Reflect.defineMetadata(METADATA_KEYS.query, metadata, target);
};

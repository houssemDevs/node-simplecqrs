import { METADATA_KEYS } from '../constants';
import { MessageMetadata } from '../types';

/**
 * decorator used to define a query
 * @param target a query
 */
export const query: ClassDecorator = (target: Function) => {
  // query metadata
  const metadata: MessageMetadata = {
    id: Symbol(target.name),
  };

  // define the query metdata on the query constructor function.
  Reflect.defineMetadata(METADATA_KEYS.query, metadata, target);
};

import { Container } from 'inversify';

import { ICommandHandler } from '../../command/commandhandler';
import { IQueryHandler } from '../../query/queryhandler';
import { IoCError } from '../types';
import { TYPES } from './constants';

export const getQHFromContainer = <T>(container: Container, name: Symbol): IQueryHandler<T> => {
  try {
    return container.getNamed(TYPES.QUERY_HANDLER, name.valueOf());
  } catch (err) {
    throw new IoCError(1, 'NOCONT_QH', err.message);
  }
};

export const getCHFromContainer = (container: Container, name: Symbol): ICommandHandler => {
  try {
    return container.getNamed(TYPES.COMMAND_HANDLER, name.valueOf());
  } catch (err) {
    throw new IoCError(1, 'NOCONT_CH', err.message);
  }
};

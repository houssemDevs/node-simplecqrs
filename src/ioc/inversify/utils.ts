import { Container } from 'inversify';

import { IQueryHandler } from '../../read/queryhandler';
import { ICommandHandler } from '../../write/commandhandler';
import { TYPES } from './constants';

export const getQHFromContainer = <T>(
  container: Container,
  name: string,
): IQueryHandler<T> => container.getNamed(TYPES.query, name);

export const getCHFromContainer = (
  container: Container,
  name: string,
): ICommandHandler => container.getNamed(TYPES.command, name);

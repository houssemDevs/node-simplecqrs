import { Container } from 'inversify';

import { IQueryHandler } from '../../read/queryhandler';
import { ICommandHandler } from '../../write/commandhandler';
import { TYPES } from './constants';

export const getQHFromContainer = <T>(container: Container, name: Symbol): IQueryHandler<T> =>
  container.getNamed(TYPES.query, name.valueOf());

export const getCHFromContainer = (container: Container, name: Symbol): ICommandHandler =>
  container.getNamed(TYPES.command, name.valueOf());

import { Container } from 'inversify';

import { ICommandHandler } from '../../command/commandhandler';
import { IQueryHandler } from '../../query/queryhandler';
import { TYPES } from './constants';

export const getQHFromContainer = <T>(container: Container, name: Symbol): IQueryHandler<T> =>
  container.getNamed(TYPES.query, name.valueOf());

export const getCHFromContainer = (container: Container, name: Symbol): ICommandHandler =>
  container.getNamed(TYPES.command, name.valueOf());

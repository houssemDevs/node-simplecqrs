import { Readable } from 'stream';

import { IQuery } from './query';

export interface IQueryHandler<TEntity> {
  get(q: IQuery): Promise<TEntity[]>;
  getStream(q: IQuery): Readable;
}

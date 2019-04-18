import { Readable } from 'stream';

import { IQuery } from './queryobject';

export interface IQueryHandler<TEntity> {
  get(q: IQuery): Promise<TEntity[]>;
  getStream(q: IQuery): Readable;
}

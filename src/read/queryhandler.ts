import { Readable } from 'stream';

import { IQuery } from './queryobject';

export interface IQueryHandler<TEntity> {
  get(query: IQuery): Promise<TEntity[]>;
  getStream(query: IQuery): Readable;
}

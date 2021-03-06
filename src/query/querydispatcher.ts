import { Readable } from 'stream';

import { IQuery } from './query';

export interface IQueryDispatcher {
  dispatch<TEntity>(q: IQuery): Promise<TEntity[]>;
  dispatchStream<TEntity>(q: IQuery): Readable;
}

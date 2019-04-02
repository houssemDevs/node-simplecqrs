import { Readable, PassThrough } from 'stream';

export interface IQueryHandler<TEntity, TQueryObject> {
  get(query: TQueryObject): Promise<TEntity[]>;
  getStream(query: TQueryObject): Readable;
}

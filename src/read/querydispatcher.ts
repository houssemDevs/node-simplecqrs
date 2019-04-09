import { Readable } from 'stream';

export interface IQueryDispatcher<TEntity, TQueryObject> {
  get(q: TQueryObject): TEntity[];
  getStream(q: TQueryObject): Readable;
}

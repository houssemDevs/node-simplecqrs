import { Readable } from 'stream';

export interface IQueryHandler<TEntity, TQueryObject> {
  get(query: TQueryObject): Promise<TEntity[]>;
  getStream(query: TQueryObject): Readable;
}

export class QueryHandler<TEntity, TQueryObject>
  implements IQueryHandler<TEntity, TQueryObject> {
  public get(query: TQueryObject): Promise<TEntity[]> {
    throw new Error('Method not implemented.');
  }
  public getStream(query: TQueryObject): Readable {
    throw new Error('Method not implemented.');
  }
}

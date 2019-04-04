import { Readable } from 'stronger-typed-streams';

export interface IQueryHandler<TEntity, TQueryObject> {
  get(query: TQueryObject): Promise<TEntity[]>;
  getStream(query: TQueryObject): Readable<TEntity>;
}

export abstract class QueryHandler<TEntity, TQueryObject>
  implements IQueryHandler<TEntity, TQueryObject> {
  public abstract get(query: TQueryObject): Promise<TEntity[]>;
  public abstract getStream(query: TQueryObject): Readable<TEntity>;
}

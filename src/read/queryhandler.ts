import { Readable } from 'stronger-typed-streams';

export interface IQueryHandler<TEntity, TQueryObject> {
  get(query: TQueryObject): Promise<TEntity[]>;
  getStream(query: TQueryObject): Readable<TEntity>;
}

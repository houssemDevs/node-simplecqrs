import 'reflect-metadata';

import { Readable } from 'stream';

import { Container } from 'inversify';

import { InversifyQueryDispatcher, IQuery, IQueryHandler, query } from '../src';

import { METADATA_KEYS } from '../src/ioc/constants';
import { QueryMetadata } from '../src/ioc/types';

describe('QueryDispatcher', () => {
  class UserQueryHandler implements IQueryHandler<{}> {
    public get(q: IQuery): Promise<Array<{}>> {
      if (q instanceof GetFirstUserQuery) {
        return Promise.resolve([{ name: 'houssem' }]);
      }
      return Promise.resolve([{ name: 'houssem' }, { name: 'narimene' }]);
    }
    public getStream(q: IQuery): Readable {
      const rs = new Readable();

      // tslint:disable-next-line: no-empty
      rs._read = () => {};

      if (query instanceof GetFirstUserQuery) {
        rs.push({ name: 'houssem' });
      } else {
        rs.push({ name: 'houssem' });
        rs.push({ name: 'narimene' });
      }

      rs.push(null);
      return rs;
    }
  }

  @query(UserQueryHandler)
  class GetUsersQuery implements IQuery {}

  @query(UserQueryHandler)
  class GetFirstUserQuery implements IQuery {}

  it('should define metadata correctly', () => {
    const metas = Reflect.getMetadata(METADATA_KEYS.queries, Reflect);

    const getUsersQueryMetadata: QueryMetadata = {
      name: GetUsersQuery.name,
      handler: UserQueryHandler,
    };

    const getFirstUserQueryMetadata: QueryMetadata = {
      name: GetFirstUserQuery.name,
      handler: UserQueryHandler,
    };

    expect(metas.length).toEqual(2);
    expect(metas[0]).toEqual(getUsersQueryMetadata);
    expect(metas[1]).toEqual(getFirstUserQueryMetadata);
  });

  it('should dispatch queries correctly', async () => {
    const iocDispatcher = new InversifyQueryDispatcher(new Container());

    const users = await iocDispatcher.dispatch(new GetUsersQuery());
    expect(users.length).toEqual(2);
    expect(users[0]).toEqual({ name: 'houssem' });
    expect(users[1]).toEqual({ name: 'narimene' });

    const firstUser = await iocDispatcher.dispatch(new GetFirstUserQuery());
    expect(firstUser.length).toEqual(1);
    expect(firstUser[0]).toEqual({ name: 'houssem' });
  });
});

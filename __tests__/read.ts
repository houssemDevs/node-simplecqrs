import 'reflect-metadata';

import { Readable } from 'stream';

import { Container } from 'inversify';

import { InversifyQueryDispatcher, IQuery, IQueryHandler, query } from '../src';

import { METADATA_KEYS } from '../src/ioc/constants';
import { queryHandler } from '../src/ioc/decorators';
import { QueryMetadata } from '../src/ioc/types';

describe('QueryDispatcher', () => {
  @query
  class GetUsersQuery implements IQuery {}

  @query
  class GetFirstUserQuery implements IQuery {}
  @queryHandler(GetUsersQuery, GetFirstUserQuery)
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

  it('should define metadata correctly', () => {
    const getUserQueryMeta = Reflect.getMetadata(METADATA_KEYS.queries, GetUsersQuery);
    expect(getUserQueryMeta).toBeDefined();
    expect(getUserQueryMeta.id).toBeDefined();

    const getFirstUserQuery = Reflect.getMetadata(METADATA_KEYS.queries, GetFirstUserQuery);
    expect(getFirstUserQuery).toBeDefined();
    expect(getFirstUserQuery.id).toBeDefined();
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

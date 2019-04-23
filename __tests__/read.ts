import 'reflect-metadata';

import { Readable } from 'stream';

import { Container } from 'inversify';

import { IoC, IQuery, IQueryHandler } from '../src';

import { METADATA_KEYS } from '../src/ioc/constants';
import { QueriesMetadata } from '../src/ioc/types';
import { getQueryMetadata } from '../src/ioc/utils';

describe('QueryDispatcher', () => {
  @IoC.query
  class GetUsersQuery implements IQuery {}

  @IoC.query
  class GetFirstUserQuery implements IQuery {}

  @IoC.queries(GetUsersQuery, GetFirstUserQuery)
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

      if (q instanceof GetFirstUserQuery) {
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
    const getUserQueryMeta = getQueryMetadata(GetUsersQuery);
    expect(getUserQueryMeta).toBeDefined();
    expect(getUserQueryMeta.id).toBeDefined();

    const getFirstUserQueryMeta = getQueryMetadata(GetFirstUserQuery);
    expect(getFirstUserQueryMeta).toBeDefined();
    expect(getFirstUserQueryMeta.id).toBeDefined();

    const queriesMetadata: QueriesMetadata = Reflect.getMetadata(
      METADATA_KEYS.queries,
      Reflect,
    );
    expect(queriesMetadata).toBeDefined();
    expect(queriesMetadata.get(getUserQueryMeta.id.valueOf())).toBeDefined();
    expect(
      queriesMetadata.get(getFirstUserQueryMeta.id.valueOf()),
    ).toBeDefined();
  });

  it('should dispatch queries correctly', async () => {
    const iocDispatcher = new IoC.Inversify.InversifyQueryDispatcher(
      new Container(),
    );

    const users = await iocDispatcher.dispatch(new GetUsersQuery());
    expect(users.length).toEqual(2);
    expect(users[0]).toEqual({ name: 'houssem' });
    expect(users[1]).toEqual({ name: 'narimene' });

    const firstUser = await iocDispatcher.dispatch(new GetFirstUserQuery());
    expect(firstUser.length).toEqual(1);
    expect(firstUser[0]).toEqual({ name: 'houssem' });
  });
});

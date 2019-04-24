import 'reflect-metadata';

import { Readable, Transform } from 'stream';

import { Container, decorate } from 'inversify';

import { Ioc, IQuery, IQueryHandler } from '../src';

import { METADATA_KEYS } from '../src/ioc/constants';
import { IoCError, QueriesMetadata } from '../src/ioc/types';
import { getQueryMetadata } from '../src/ioc/utils';

class GetUsersQuery implements IQuery {}
class GetFirstUserQuery implements IQuery {}
class UserQueryHandler implements IQueryHandler<{}> {
  public get(q: IQuery): Promise<Array<{}>> {
    if (q instanceof GetFirstUserQuery) {
      return Promise.resolve([{ name: 'houssem' }]);
    }
    return Promise.resolve([{ name: 'houssem' }, { name: 'narimene' }]);
  }
  public getStream(q: IQuery): Readable {
    const rs = new Readable({ objectMode: true });

    // tslint:disable-next-line: no-empty
    rs._read = () => {};
    setTimeout(() => {
      if (q instanceof GetFirstUserQuery) {
        rs.push({ name: 'houssem' });
      } else {
        rs.push({ name: 'houssem' });
        rs.push({ name: 'narimene' });
      }
      rs.push(null);
    }, 500);

    return rs;
  }
}

decorate(Ioc.query, GetUsersQuery);
decorate(Ioc.query, GetFirstUserQuery);
decorate(Ioc.queries(GetUsersQuery, GetFirstUserQuery), UserQueryHandler);

describe('QueryDispatcher', () => {
  const iocDispatcher = new Ioc.Inversify.InversifyQueryDispatcher(new Container());

  it('should dispatch queries correctly', async () => {
    const users = await iocDispatcher.dispatch(new GetUsersQuery());
    expect(users.length).toEqual(2);
    expect(users[0]).toEqual({ name: 'houssem' });
    expect(users[1]).toEqual({ name: 'narimene' });

    const firstUser = await iocDispatcher.dispatch(new GetFirstUserQuery());
    expect(firstUser.length).toEqual(1);
    expect(firstUser[0]).toEqual({ name: 'houssem' });
  });

  it('should dispatchStream queries correctly', () => {
    class ReduceStream extends Transform {
      constructor(public d: any[] = []) {
        super({ objectMode: true });
      }
      public _transform(data: any, encoding: string, done: any) {
        this.d.push(data);
        done();
      }
    }
    return new Promise(res => {
      const rs = iocDispatcher.dispatchStream(new GetUsersQuery()).pipe(new ReduceStream());
      rs.on('data', d => d);
      rs.on('end', () => {
        expect(rs.d.length).toEqual(2);
        expect(rs.d[0]).toEqual({ name: 'houssem' });
        expect(rs.d[1]).toEqual({ name: 'narimene' });
        res();
      });
    });
  });

  it('should throw when dispatching unhandled query', () => {
    class UnhandledQuery {}
    decorate(Ioc.query, UnhandledQuery);

    expect(() => {
      iocDispatcher.dispatch(new UnhandledQuery());
    }).toThrow(IoCError);

    expect(() => {
      iocDispatcher.dispatchStream(new UnhandledQuery());
    }).toThrow(IoCError);
  });
});

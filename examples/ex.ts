import 'reflect-metadata';

import { Container } from 'inversify';
import { Readable } from 'stream';
import { IoC, IQuery, IQueryHandler } from '../lib/index';

@IoC.query
@IoC.query
@IoC.query
class GetUser implements IQuery {}

@IoC.query
class FetchUser implements IQuery {}

@IoC.queries(GetUser)
class UserHandler implements IQueryHandler<{}> {
  public get(q: IQuery): Promise<Array<{}>> {
    return Promise.resolve([{ id: 1 }, { id: 2 }]);
  }
  public getStream(q: IQuery): Readable {
    const rs = new Readable({ objectMode: true });
    setTimeout(() => {
      rs.push({ id: 1 });
      rs.push({ id: 2 });
      rs.push(null);
    }, 500);
    return rs;
  }
}

@IoC.queries(GetUser)
class UserHandlerWinner implements IQueryHandler<{}> {
  public get(q: IQuery): Promise<Array<{}>> {
    return Promise.resolve([{ id: 3 }, { id: 4 }]);
  }
  public getStream(q: IQuery): Readable {
    const rs = new Readable({ objectMode: true });
    setTimeout(() => {
      rs.push({ id: 1 });
      rs.push({ id: 2 });
      rs.push(null);
    }, 500);
    return rs;
  }
}

const dispatcher = new IoC.Inversify.InversifyQueryDispatcher(new Container());

(async () => {
  const result = await dispatcher.dispatch(new FetchUser());
  result = await dispatcher.dispatch(new GetUser());
  console.log(result);
})();

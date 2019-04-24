import 'reflect-metadata';

import { Container } from 'inversify';
import { Readable } from 'stream';
import { Ioc, IQuery, IQueryHandler } from '../lib/index';

class GetUser implements IQuery {}
class FetchUser implements IQuery {}

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

Reflect.decorate([Ioc.query], GetUser);
Reflect.decorate([Ioc.query], FetchUser);
Reflect.decorate([Ioc.queries(GetUser)], UserHandler);
Reflect.decorate([Ioc.queries(GetUser)], UserHandlerWinner);

const dispatcher = new Ioc.Inversify.InversifyQueryDispatcher(new Container());

(async () => {
  let result = await dispatcher.dispatch(new FetchUser());
  result = await dispatcher.dispatch(new GetUser());
})();

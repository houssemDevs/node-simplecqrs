import { Readable } from 'stronger-typed-streams';
import { Connection, Request } from 'tedious';

import { IQueryHandler, QueryHandler } from '../../../read/queryhandler';
import { ISqlQuery } from '../sqlqueryobject';
import { ITdsDataMapper } from './tdsdatamapper';
import { EntityStream, TdsConnectionConfig } from './utils';

export interface ITdsQueryHandler<TEntity>
  extends IQueryHandler<TEntity, ISqlQuery> {}

export class TdsQueryHandler<TEntity> extends QueryHandler<TEntity, ISqlQuery>
  implements ITdsQueryHandler<TEntity> {
  private connection: Promise<Connection>;
  private dataMapper: ITdsDataMapper<TEntity>;
  constructor(config: TdsConnectionConfig, dm: ITdsDataMapper<TEntity>) {
    super();
    this.dataMapper = dm;
    this.connection = new Promise((res) => {
      const cnn = new Connection(config);
      cnn.once('connect', (err) => {
        if (err) {
          res(undefined);
        } else {
          res(cnn);
        }
      });
    });
  }
  public get(query: ISqlQuery): Promise<TEntity[]> {
    const result: TEntity[] = [];
    return new Promise((res, rej) => {
      this.connection
        .then((cnn) => {
          if (!cnn) {
            res(result);
          }
          const req = new Request(query.toExpression(), (err) => {
            if (err) {
              rej(err);
            }
            cnn.close();
            res(result);
          });
          req.on('row', (row) => {
            const aff = this.dataMapper.toDomain(row);
            result.push(aff);
          });
          cnn.execSql(req);
        })
        .catch((err) => rej(err));
    });
  }
  public getStream(query: ISqlQuery): Readable<TEntity> {
    const rs = new EntityStream<TEntity>({ objectMode: true });
    this.connection
      .then((cnn) => {
        const req = new Request(query.toExpression(), (err) => {
          if (err) {
            rs.emit('error', err);
          }
          rs.push(null);
          cnn.close();
        });
        req.on('row', (row) => rs.push(this.dataMapper.toDomain(row)));
        cnn.execSql(req);
      })
      .catch((err) => {
        rs.emit('error', err);
        rs.push(null);
      });
    return rs;
  }
}

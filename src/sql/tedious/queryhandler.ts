import { Readable, PassThrough } from 'stream';

import tds, { Connection, Request, ColumnValue } from 'tedious';

import { TdsConnectionConfig } from './utils';
import { IQueryHandler } from '../../interface/queryhandler';
import { ISqlQuery } from '../queryobject';
import { ITdsDataMapper } from './datamapper';

export interface ITdsQueryHandler<TEntity>
  extends IQueryHandler<TEntity, ISqlQuery> {}

export class TdsQueryHandler<TEntity> implements ITdsQueryHandler<TEntity> {
  private connection: Promise<Connection>;
  private dataMapper: ITdsDataMapper<TEntity>;
  constructor(config: TdsConnectionConfig, dm: ITdsDataMapper<TEntity>) {
    this.dataMapper = dm;
    this.connection = new Promise(res => {
      const cnn = new Connection(config);
      cnn.once('connect', err => {
        if (err) {
          console.log(err);
          res(undefined);
        } else {
          res(cnn);
        }
      });
    });
  }
  get(query: ISqlQuery): Promise<TEntity[]> {
    const result: TEntity[] = [];
    return new Promise((res, rej) => {
      this.connection
        .then(cnn => {
          if (!cnn) {
            res(result);
          }
          const req = new Request(query.toExpression(), err => {
            if (err) {
              rej(err);
            }
            cnn.close();
            res(result);
          });
          req.on('row', row => {
            const aff = this.dataMapper.toDomain(row);
            result.push(aff);
          });
          cnn.execSql(req);
        })
        .catch(err => rej(err));
    });
  }
  getStream(query: ISqlQuery): Readable {
    const rs = new Readable({ objectMode: true });
    rs._read = () => {};
    this.connection
      .then(cnn => {
        const req = new Request(query.toExpression(), err => {
          if (err) {
            rs.emit('error', err);
          }
          rs.push(null);
          cnn.close();
        });
        req.on('row', row => rs.push(this.dataMapper.toDomain(row)));
        cnn.execSql(req);
      })
      .catch(err => {
        rs.emit('error', err);
        rs.push(null);
      });
    return rs;
  }
}

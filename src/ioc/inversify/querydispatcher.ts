import { Readable } from 'stream';

import { Container, decorate, injectable } from 'inversify';

import { IQueryDispatcher } from '../../read/querydispatcher';
import { IQueryHandler } from '../../read/queryhandler';
import { IQuery } from '../../read/queryobject';
import { METADATA_KEYS } from '../constants';
import { QueryMetadata } from '../types';
import { TYPES } from './constants';

export class InversifyQueryDispatcher implements IQueryDispatcher {
  constructor(private container: Container) {
    const queriesMetadata: QueryMetadata[] =
      Reflect.getMetadata(METADATA_KEYS.queries, Reflect) || [];
    queriesMetadata.forEach((qm) => {
      decorate(injectable(), qm.handler);
      this.container
        .bind(TYPES.query)
        .to(qm.handler)
        .whenTargetNamed(qm.name);
    });
  }
  public dispatch<TEntity>(q: IQuery): Promise<TEntity[]> {
    const handler: IQueryHandler<TEntity> = this.container.getNamed(
      TYPES.query,
      Object.getPrototypeOf(q).constructor.name,
    );
    if (handler) {
      return handler.get(q);
    }
    throw new Error(`no handler for ${q}`);
  }
  public dispatchStream<TEntity>(q: IQuery): Readable {
    const handler: IQueryHandler<TEntity> = this.container.getNamed(
      TYPES.query,
      Object.getPrototypeOf(q).constructor.name,
    );
    if (handler) {
      return handler.getStream(q);
    }
    throw new Error(`no handler for ${q}`);
  }
}

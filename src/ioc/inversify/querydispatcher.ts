import { Readable } from 'stream';

import { Container, decorate, injectable } from 'inversify';

import { IQueryDispatcher } from '../../read/querydispatcher';
import { IQuery } from '../../read/queryobject';
import { getObjectName, getQueriesMetadata } from '../utils';
import { TYPES } from './constants';
import { getQHFromContainer } from './utils';

export class InversifyQueryDispatcher implements IQueryDispatcher {
  constructor(private container: Container) {
    const queriesMetadata = getQueriesMetadata();

    const alreadyDecoratedHandlers: Set<any> = new Set();

    queriesMetadata.forEach((qm) => {
      if (!alreadyDecoratedHandlers.has(qm.handler)) {
        decorate(injectable(), qm.handler);
        alreadyDecoratedHandlers.add(qm.handler);
      }

      this.container
        .bind(TYPES.query)
        .to(qm.handler)
        .whenTargetNamed(qm.name);
    });
  }

  public dispatch<TEntity>(q: IQuery): Promise<TEntity[]> {
    const h = getQHFromContainer<TEntity>(this.container, getObjectName(q));

    if (h) {
      return h.get(q);
    }

    throw new Error(`no handler for ${q}`);
  }

  public dispatchStream<TEntity>(q: IQuery): Readable {
    const h = getQHFromContainer<TEntity>(this.container, getObjectName(q));

    if (h) {
      return h.getStream(q);
    }

    throw new Error(`no handler for ${q}`);
  }
}

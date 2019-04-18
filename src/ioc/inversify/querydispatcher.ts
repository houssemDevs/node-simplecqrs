import { Readable } from 'stream';

import { Container, decorate, injectable } from 'inversify';

import { IQueryDispatcher } from '../../read/querydispatcher';
import { IQuery } from '../../read/queryobject';
import {
  getObjectName,
  getQHMetadata,
  getQueriesMetadata,
  getQueryId,
  getQueryMetadata,
} from '../utils';
import { TYPES } from './constants';
import { getQHFromContainer } from './utils';

export class InversifyQueryDispatcher implements IQueryDispatcher {
  constructor(private container: Container) {
    const qhMetadata = getQHMetadata();

    qhMetadata.forEach((qh) => {
      qh.queries.forEach((qn) => {
        this.container
          .bind(TYPES.query)
          .to(qh.handler)
          .whenTargetNamed(qn.id.valueOf());
      });
    });
  }

  public dispatch<TEntity>(q: IQuery): Promise<TEntity[]> {
    const h = getQHFromContainer<TEntity>(
      this.container,
      getQueryId(q).valueOf(),
    );

    if (h) {
      return h.get(q);
    }

    throw new Error(`no handler for ${q}`);
  }

  public dispatchStream<TEntity>(q: IQuery): Readable {
    const h = getQHFromContainer<TEntity>(
      this.container,
      getQueryId(q).valueOf(),
    );

    if (h) {
      return h.getStream(q);
    }

    throw new Error(`no handler for ${q}`);
  }
}

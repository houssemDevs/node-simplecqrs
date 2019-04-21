import { Readable } from 'stream';

import { Container, decorate, injectable } from 'inversify';

import { IQuery } from '../../query/query';
import { IQueryDispatcher } from '../../query/querydispatcher';
import { getObjectConstructor, getQHMetadata, getQueryId } from '../utils';
import { TYPES } from './constants';
import { getQHFromContainer } from './utils';

export class InversifyQueryDispatcher implements IQueryDispatcher {
  constructor(private container: Container) {
    const qhMetadata = getQHMetadata();

    qhMetadata.forEach((qhm) => {
      decorate(injectable(), qhm.handler);

      qhm.queries.forEach((qn) => {
        this.container
          .bind(TYPES.queryHandler)
          .to(qhm.handler)
          .whenTargetNamed(qn.id.valueOf());
      });
    });
  }

  public dispatch<TEntity>(q: IQuery): Promise<TEntity[]> {
    const h = getQHFromContainer<TEntity>(
      this.container,
      getQueryId(getObjectConstructor(q)),
    );

    if (h) {
      return h.get(q);
    }

    throw new Error(`no handler for ${getObjectConstructor(q)}`);
  }

  public dispatchStream<TEntity>(q: IQuery): Readable {
    const h = getQHFromContainer<TEntity>(
      this.container,
      getQueryId(getObjectConstructor(q)),
    );

    if (h) {
      return h.getStream(q);
    }

    throw new Error(`no handler for ${getObjectConstructor(q)}`);
  }
}

import { Readable } from 'stream';

import { Container, decorate, injectable } from 'inversify';

import { IQuery } from '../../query/query';
import { IQueryDispatcher } from '../../query/querydispatcher';
import { getObjectConstructor, getQueriesMetadata, getQueryId } from '../utils';
import { TYPES } from './constants';
import { getQHFromContainer } from './utils';

export class InversifyQueryDispatcher implements IQueryDispatcher {
  constructor(private container: Container) {
    const queriesMetadata = getQueriesMetadata();

    const alreadyInjectable = new Set<string>();

    queriesMetadata.forEach((qHandlerMetadata, qId) => {
      if (!alreadyInjectable.has(qHandlerMetadata.name)) {
        decorate(injectable(), qHandlerMetadata.handler);
        alreadyInjectable.add(qHandlerMetadata.name);
      }

      this.container
        .bind(TYPES.QUERY_HANDLER)
        .to(qHandlerMetadata.handler)
        .whenTargetNamed(qId);
    });
  }

  public dispatch<TEntity>(q: IQuery): Promise<TEntity[]> {
    const h = getQHFromContainer<TEntity>(this.container, getQueryId(getObjectConstructor(q)));

    if (h) {
      return h.get(q);
    }

    throw new Error(`no handler for ${getObjectConstructor(q)}`);
  }

  public dispatchStream<TEntity>(q: IQuery): Readable {
    const h = getQHFromContainer<TEntity>(this.container, getQueryId(getObjectConstructor(q)));

    if (h) {
      return h.getStream(q);
    }

    throw new Error(`no handler for ${getObjectConstructor(q)}`);
  }
}

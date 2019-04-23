import { METADATA_KEYS } from './constants';
import { CommandsMetadata, IoCError, MessageMetadata, QueriesMetadata } from './types';

export const getQueriesMetadata = (): QueriesMetadata => {
  const metas: QueriesMetadata = Reflect.getMetadata(METADATA_KEYS.queries, Reflect);

  if (metas) {
    return metas;
  }

  throw new IoCError(
    0,
    'NOMETA_QS',
    `no query handler registred to handle dispatched queries, try use @queries decorator`,
  );
};

export const getCommandsMetadata = (): CommandsMetadata => {
  const metas: CommandsMetadata = Reflect.getMetadata(METADATA_KEYS.commands, Reflect);

  if (metas) {
    return metas;
  }

  throw new IoCError(
    0,
    'NOMETA_CS',
    `no command handler registred to handle dispatched commands, try use @commands decorator`,
  );
};

export const getQueryMetadata = (q: Function): MessageMetadata => {
  const meta: MessageMetadata = Reflect.getMetadata(METADATA_KEYS.query, q);
  if (meta) {
    return meta;
  }
  throw new IoCError(0, 'NOMETA_QU', `query ${q.name} has no metadata, you may need to add @query decorator`);
};

export const getCommandMetadata = (c: Function): MessageMetadata => {
  const meta: MessageMetadata = Reflect.getMetadata(METADATA_KEYS.command, c);
  if (meta) {
    return meta;
  }
  throw new IoCError(0, 'NOMETA_CO', `command ${c.name} has no metadata, you may need to add @command decorator`);
};

export const getQueryId = (q: Function): symbol => getQueryMetadata(q).id.valueOf();

export const getCommandId = (c: Function): symbol => getCommandMetadata(c).id.valueOf();

export const getObjectName = (o: any): string => o.constructor.name;

export const getObjectConstructor = (o: any): Function => o.constructor;

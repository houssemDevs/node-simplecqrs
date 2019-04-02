import { IDateMapper } from '../../interface/datamapper';
import { ColumnValue } from 'tedious';

export interface ITdsDataMapper<TEntity> extends IDateMapper<ColumnValue[], TEntity> {}

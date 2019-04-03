import { ColumnValue } from 'tedious';
import { IDateMapper } from '../../../common/datamapper';

export interface ITdsDataMapper<TEntity>
  extends IDateMapper<ColumnValue[], TEntity> {}

import { ColumnValue } from 'tedious';
import { IDateMapper } from '../../../common/datamapper';

export interface ITdsDataMapper<TEntity>
  extends IDateMapper<ColumnValue[], TEntity> {}

export abstract class TdsDataMapper implements ITdsDataMapper<{}> {
  public toDomain(s: ColumnValue[]): {} {
    return s.reduce((e, c) => ({ ...e, [c.metadata.colName]: c.value }), {});
  }
  public abstract toStore(d: {}): ColumnValue[];
}

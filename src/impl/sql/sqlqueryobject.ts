import { IQuery, Query } from '../../read/queryobject';
import { ISqlCriteria } from './sqlcriteria';

export interface ISqlQuery extends IQuery<ISqlCriteria, string> {}

export class SqlQuery extends Query<ISqlCriteria, string> implements ISqlQuery {
  public static selectQuery(
    tableName: string,
    columnNames: string[],
  ): SqlQuery {
    return new SqlQuery(
      `SELECT ${
        columnNames.length === 0 ? '*' : columnNames.join(',')
      } FROM ${tableName}`,
    );
  }
  protected rootExpression: string;
  protected constructor(rootExpression: string = '') {
    super();
    this.rootExpression = rootExpression;
  }
  public toExpression(): string {
    this.beginNewGroup();
    let whereClause = '';
    this.criteriaGroups.forEach((grp) => {
      if (whereClause.length === 0) {
        whereClause += ` WHERE (${grp
          .map((c) => c.toExpression())
          .join(' AND ')})`;
      } else {
        whereClause += ` OR (${grp.map((c) => c.toExpression()).join(' AND ')})`;
      }
    });
    return `${this.rootExpression} ${whereClause}`;
  }
}

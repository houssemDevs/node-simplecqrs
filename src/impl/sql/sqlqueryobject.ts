import { IQuery } from '../../read/queryobject';
import { ISqlCriteria } from './sqlcriteria';

export interface ISqlQuery extends IQuery<ISqlCriteria, string> {}

export class SqlQuery implements ISqlQuery {
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
  protected criteriaGroups: ISqlCriteria[][];
  protected currentCriteriaGroup: ISqlCriteria[];
  protected constructor(rootExpression: string = '') {
    this.criteriaGroups = [];
    this.currentCriteriaGroup = [];
    this.rootExpression = rootExpression;
  }
  public addCriteria(c: ISqlCriteria): IQuery<ISqlCriteria, string> {
    this.currentCriteriaGroup.push(c);
    return this;
  }
  public beginNewGroup(): IQuery<ISqlCriteria, string> {
    this.criteriaGroups.push(this.currentCriteriaGroup);
    this.currentCriteriaGroup = [];
    return this;
  }
  public toExpression(): string {
    if (this.currentCriteriaGroup.length > 0) {
      this.criteriaGroups.push(this.currentCriteriaGroup);
      this.currentCriteriaGroup = [];
    }
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

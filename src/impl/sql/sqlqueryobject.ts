import { IQuery } from '../../read/queryobject';
import { ISqlCriteria } from './sqlcriteria';

export interface ISqlQuery extends IQuery<ISqlCriteria, string> {}

export class SqlQuery implements ISqlQuery {
  protected criteriaGroups: ISqlCriteria[][];
  protected currentCriteriaGroup: ISqlCriteria[];
  protected constructor() {
    this.criteriaGroups = [];
    this.currentCriteriaGroup = [];
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
    throw new Error(
      'This class is intended to be subclassed. Ex.: GetStudentQuery',
    );
  }
}

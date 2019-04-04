export interface IQuery<TCriteria, TExpression> {
  addCriteria(c: TCriteria): IQuery<TCriteria, TExpression>;
  beginNewGroup(): IQuery<TCriteria, TExpression>;
  toExpression(): TExpression;
}

export abstract class Query<TCriteria, TExpression>
  implements IQuery<TCriteria, TExpression> {
  protected criteriaGroups: TCriteria[][];
  protected currentCriteriaGroup: TCriteria[];
  constructor() {
    this.criteriaGroups = [];
    this.currentCriteriaGroup = [];
  }
  public addCriteria(c: TCriteria): IQuery<TCriteria, TExpression> {
    this.currentCriteriaGroup.push(c);
    return this;
  }
  public beginNewGroup(): IQuery<TCriteria, TExpression> {
    if (this.currentCriteriaGroup.length > 0) {
      this.criteriaGroups.push(this.currentCriteriaGroup);
      this.currentCriteriaGroup = [];
    }
    return this;
  }
  public abstract toExpression(): TExpression;
}

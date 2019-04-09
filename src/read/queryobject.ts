export interface IQuery<TExpression, TCriteria> {
  addCriteria(c: TCriteria): IQuery<TExpression, TCriteria>;
  beginNewGroup(): IQuery<TExpression, TCriteria>;
  toExpression(): TExpression;
}

export abstract class Query<TExpression, TCriteria>
  implements IQuery<TExpression, TCriteria> {
  protected criteriaGroups: TCriteria[][];
  protected currentCriteriaGroup: TCriteria[];
  constructor() {
    this.criteriaGroups = [];
    this.currentCriteriaGroup = [];
  }
  public addCriteria(c: TCriteria): IQuery<TExpression, TCriteria> {
    this.currentCriteriaGroup.push(c);
    return this;
  }
  public beginNewGroup(): IQuery<TExpression, TCriteria> {
    if (this.currentCriteriaGroup.length > 0) {
      this.criteriaGroups.push(this.currentCriteriaGroup);
      this.currentCriteriaGroup = [];
    }
    return this;
  }
  public abstract toExpression(): TExpression;
}

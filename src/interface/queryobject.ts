export interface IQuery<TCriteria, TExpression> {
  addCriteria(c: TCriteria): IQuery<TCriteria, TExpression>;
  beginNewGroup(): IQuery<TCriteria, TExpression>;
  toExpression(): TExpression;
}

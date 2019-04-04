export interface ICriteria<TExpression> {
  toExpression(): TExpression;
}

export abstract class Criteria<TExpression> implements ICriteria<TExpression> {
  public abstract toExpression(): TExpression;
}

export interface ICriteria<TExpression> {
  toExpression(): TExpression;
}

export class Criteria<TExpression> implements ICriteria<TExpression> {
  public toExpression(): TExpression {
    throw new Error('Method not implemented.');
  }
}

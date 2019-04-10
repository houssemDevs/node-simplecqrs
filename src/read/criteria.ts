export interface ICriteria<TExpression> {
  toExpression(): TExpression;
}

export interface IFilterCriteria<TExpression> extends ICriteria<TExpression> {}

export interface ISortCriteria<TExpression> extends ICriteria<TExpression> {}

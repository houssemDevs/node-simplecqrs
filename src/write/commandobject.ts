export interface ICommand<TExpression> {
  toExpression(): TExpression;
}

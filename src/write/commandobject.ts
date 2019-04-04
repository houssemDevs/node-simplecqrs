export interface ICommand<TExpression> {
  toExpression(): TExpression;
}

export abstract class Command<TExpression> implements ICommand<TExpression> {
  public abstract toExpression(): TExpression;
}

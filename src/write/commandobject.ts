export interface ICommand<TExpression> {
  toExpression(): TExpression;
}

export class Command<TExpression> implements ICommand<TExpression> {
  public toExpression(): TExpression {
    throw new Error('Method not implemented.');
  }
}

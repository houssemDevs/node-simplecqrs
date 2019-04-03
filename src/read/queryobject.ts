export interface IQuery<TCriteria, TExpression> {
  addCriteria(c: TCriteria): IQuery<TCriteria, TExpression>;
  beginNewGroup(): IQuery<TCriteria, TExpression>;
  toExpression(): TExpression;
}

export class Query<TCriteria, TExpression>
  implements IQuery<TCriteria, TExpression> {
  public addCriteria(c: TCriteria): IQuery<TCriteria, TExpression> {
    throw new Error('Method not implemented.');
  }
  public beginNewGroup(): IQuery<TCriteria, TExpression> {
    throw new Error('Method not implemented.');
  }
  public toExpression(): TExpression {
    throw new Error('Method not implemented.');
  }
}

export interface IQuery<TExpression, TFilterCriteria, TSortCriteria> {
  addFilterCriteria(
    c: TFilterCriteria,
  ): IQuery<TExpression, TFilterCriteria, TSortCriteria>;
  addSortCriteria(
    c: TSortCriteria,
  ): IQuery<TExpression, TFilterCriteria, TSortCriteria>;
  beginNewFilterGroup(): IQuery<TExpression, TFilterCriteria, TSortCriteria>;
  toExpression(): TExpression;
}

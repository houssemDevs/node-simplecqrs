export interface IDateMapper<TSource, TDestination> {
  toDestination(s: TSource): TDestination;
  toSource(d: TDestination): TSource;
}

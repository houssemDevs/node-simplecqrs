export interface IDateMapper<TStoreEntity, TDomainEntity> {
  toDomain(s: TStoreEntity): TDomainEntity;
  toStore(d: TDomainEntity): TStoreEntity;
}

export abstract class DataMapper<TStoreEntity, TDomainEntity> implements IDateMapper<TStoreEntity, TDomainEntity> {
  public abstract toDomain(s: TStoreEntity): TDomainEntity;
  public abstract toStore(d: TDomainEntity): TStoreEntity;
}

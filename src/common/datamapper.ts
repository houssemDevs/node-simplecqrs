export interface IDateMapper<TStoreEntity, TDomainEntity> {
  toDomain(s: TStoreEntity): TDomainEntity;
  toStore(d: TDomainEntity): TStoreEntity;
}

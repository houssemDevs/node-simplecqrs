export interface IDateMapper<TPersistanceEntity, TDomainEntity> {
  toDomain(s: TPersistanceEntity): TDomainEntity;
  toStore(d: TDomainEntity): TPersistanceEntity;
}

export class DataMapper<TStoreEntity, TDomainEntity>
  implements IDateMapper<TStoreEntity, TDomainEntity> {
  public toDomain(s: TStoreEntity): TDomainEntity {
    throw new Error('Method not implemented.');
  }
  public toStore(d: TDomainEntity): TStoreEntity {
    throw new Error('Method not implemented.');
  }
}

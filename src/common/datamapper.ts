export interface IDateMapper<TPersistanceEntity, TDomainEntity> {
  toDomain(s: TPersistanceEntity): TDomainEntity;
  toPersistance(d: TDomainEntity): TPersistanceEntity;
}

export class DataMapper<TPersistanceEntity, TDomainEntity>
  implements IDateMapper<TPersistanceEntity, TDomainEntity> {
  public toDomain(s: TPersistanceEntity): TDomainEntity {
    throw new Error('Method not implemented.');
  }
  public toPersistance(d: TDomainEntity): TPersistanceEntity {
    throw new Error('Method not implemented.');
  }
}

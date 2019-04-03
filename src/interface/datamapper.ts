export interface IDateMapper<TPersistanceEntity, TDomainEntity> {
  toDomain(s: TPersistanceEntity): TDomainEntity;
  toPersistance(d: TDomainEntity): TPersistanceEntity;
}

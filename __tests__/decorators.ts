import 'reflect-metadata';

import { Ioc, IQuery } from '../src';
import { METADATA_KEYS } from '../src/ioc/constants';

describe('ioc decorators', () => {
  describe('query', () => {
    it('should define metadata correctly', () => {
      class UserQuery {}
      Reflect.decorate([Ioc.query], UserQuery);

      const metadata = Reflect.getMetadata(METADATA_KEYS.query, UserQuery);

      expect(metadata).toBeDefined();
      expect(metadata.id).toBeDefined();
    });
  });

  describe('command', () => {
    it('should define metadata correctly', () => {
      class UserCommand {}
      Reflect.decorate([Ioc.command], UserCommand);

      const metadata = Reflect.getMetadata(METADATA_KEYS.command, UserCommand);

      expect(metadata).toBeDefined();
      expect(metadata.id).toBeDefined();
    });
  });

  describe('queries', () => {
    class UserQuery {}
    class UserQueryHandler {}
    Reflect.decorate([Ioc.query], UserQuery);
    Reflect.decorate([Ioc.queries(UserQuery)], UserQueryHandler);

    const userQueryMetadata = Reflect.getMetadata(
      METADATA_KEYS.query,
      UserQuery,
    );

    it('should define metadata correctly', () => {
      const metadata = Reflect.getMetadata(METADATA_KEYS.queries, Reflect);

      expect(metadata).toBeDefined();
      expect(metadata.get(userQueryMetadata.id.valueOf())).toBeDefined();
    });

    it('should use the last defined query handler when multiple are defined for same query', () => {
      class BetterUserQueryHandler {}
      Reflect.decorate([Ioc.queries(UserQuery)], BetterUserQueryHandler);

      const metadata = Reflect.getMetadata(METADATA_KEYS.queries, Reflect);
      expect(metadata.get(userQueryMetadata.id.valueOf()).handler).toBe(
        BetterUserQueryHandler,
      );
    });
  });

  describe('commands', () => {
    class UserCommand {}
    class UserCommandHandler {}
    Reflect.decorate([Ioc.command], UserCommand);
    Reflect.decorate([Ioc.commands(UserCommand)], UserCommandHandler);

    const userCommandMetadata = Reflect.getMetadata(
      METADATA_KEYS.command,
      UserCommand,
    );

    it('should define metadata correctly', () => {
      const metadata = Reflect.getMetadata(METADATA_KEYS.commands, Reflect);

      expect(metadata).toBeDefined();
      expect(metadata.get(userCommandMetadata.id.valueOf())).toBeDefined();
    });

    it('should use the last defined command handler when multiple are defined for same command', () => {
      class BetterUserCommandHandler {}
      Reflect.decorate([Ioc.commands(UserCommand)], BetterUserCommandHandler);

      const metadata = Reflect.getMetadata(METADATA_KEYS.commands, Reflect);
      expect(metadata.get(userCommandMetadata.id.valueOf()).handler).toBe(
        BetterUserCommandHandler,
      );
    });
  });
});

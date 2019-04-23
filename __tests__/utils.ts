import 'reflect-metadata';

import {} from '../src';
import { command, commands, queries, query } from '../src/ioc';
import {
  getCommandId,
  getCommandMetadata,
  getCommandsMetadata,
  getObjectConstructor,
  getObjectName,
  getQueriesMetadata,
  getQueryId,
  getQueryMetadata,
} from '../src/ioc/utils';

class Query {}
class Command {}

class QueryHandler {}
class CommandHandler {}

Reflect.decorate([query], Query);
Reflect.decorate([command], Command);

Reflect.decorate([queries(Query)], QueryHandler);
Reflect.decorate([commands(Command)], CommandHandler);

describe('utils', () => {
  describe('getQueryMetadata', () => {
    it('should return query metadata given constructor function', () => {
      expect(getQueryMetadata(Query)).toBeDefined();
      expect(getQueryMetadata(Query).id).toBeDefined();
    });
  });

  describe('getQueryId', () => {
    it('should return query id from query metadata', () => {
      expect(getQueryId(Query)).toBeDefined();
      expect(getQueryId(Query)).toEqual(getQueryMetadata(Query).id);
    });
  });

  describe('getCommandMetadata', () => {
    it('should return command metadata given constructor function', () => {
      expect(getCommandMetadata(Command)).toBeDefined();
      expect(getCommandMetadata(Command).id).toBeDefined();
    });
  });

  describe('getCommandId', () => {
    it('should return command id from command metadata', () => {
      expect(getCommandId(Command)).toBeDefined();
      expect(getCommandId(Command)).toEqual(getCommandMetadata(Command).id);
    });
  });

  describe('getCommandsMetadata', () => {
    it('should return commands metadata from Reflect global object', () => {
      const commandsMetadata = getCommandsMetadata();

      expect(commandsMetadata).toBeDefined();
      expect(commandsMetadata.get(getCommandId(Command))).toBeDefined();
      expect(commandsMetadata.get(getCommandId(Command)).handler).toBe(CommandHandler);
    });
  });

  describe('getQueriesMetadata', () => {
    it('should return queries metadata from Reflect global object', () => {
      const queriesMetadata = getQueriesMetadata();

      expect(queriesMetadata).toBeDefined();
      expect(queriesMetadata.get(getQueryId(Query))).toBeDefined();
      expect(queriesMetadata.get(getQueryId(Query)).handler).toBe(QueryHandler);
    });
  });

  describe('getObjectConstructor', () => {
    it('should return the instance constructor function', () => {
      const q = new Query();

      class Qu extends Query {}

      const qu = new Qu();

      expect(getObjectConstructor(q)).toBe(Query);
      expect(getObjectConstructor(qu)).toBe(Qu);
    });
  });

  describe('getObjectName', () => {
    it('should return the instance constructor function name', () => {
      const q = new Query();

      class Qu extends Query {}

      const qu = new Qu();

      expect(getObjectName(q)).toBe(Query.name);
      expect(getObjectName(qu)).toBe(Qu.name);
    });
  });
});

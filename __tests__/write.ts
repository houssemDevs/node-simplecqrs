import 'reflect-metadata';

import { Container } from 'inversify';

import {
  command,
  ICommand,
  ICommandHandler,
  InvesrifyCommandDispatcher,
} from '../src';

import { CommandMetadata } from '../src/ioc/types';
import { getCommandsMetadata, getObjectName } from '../src/ioc/utils';

describe('CommandDispatcher', () => {
  class CommandHandler implements ICommandHandler {
    public exec(c: ICommand): Promise<boolean> {
      if (c instanceof DeleteUserCommand) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    }
  }

  @command(CommandHandler)
  class CreateUserCommand implements ICommand {}

  @command(CommandHandler)
  class DeleteUserCommand implements ICommand {}

  describe('metadata', () => {
    it('should define metadata correctly', () => {
      const metas = getCommandsMetadata();

      const createUserCommandMetadata: CommandMetadata = {
        name: CreateUserCommand.name,
        handler: CommandHandler,
      };

      const deleteUserCommandMetadata: CommandMetadata = {
        name: DeleteUserCommand.name,
        handler: CommandHandler,
      };

      expect(metas.length).toEqual(2);
      expect(metas[0]).toEqual(createUserCommandMetadata);
      expect(metas[1]).toEqual(deleteUserCommandMetadata);
    });
  });

  describe('dispatching', () => {
    it('should dispatch commands correctly', async () => {
      const iocDispatcher = new InvesrifyCommandDispatcher(new Container());

      const isCreated = await iocDispatcher.dispatch(new CreateUserCommand());
      expect(isCreated).toBeTruthy();

      const isDeleted = await iocDispatcher.dispatch(new DeleteUserCommand());
      expect(isDeleted).toBeFalsy();
    });
  });
});

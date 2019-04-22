import 'reflect-metadata';

import { Container, injectable } from 'inversify';

import { ICommand, ICommandHandler, IoC } from '../src';

import { getCommandMetadata } from '../src/ioc/utils';

describe('CommandDispatcher', () => {
  @IoC.command
  class CreateUserCommand implements ICommand {}

  @IoC.command
  class DeleteUserCommand implements ICommand {}

  class UpdateUserCommand implements ICommand {}

  @IoC.commands(CreateUserCommand, DeleteUserCommand)
  class CommandHandler implements ICommandHandler {
    public exec(c: ICommand): Promise<boolean> {
      if (c instanceof DeleteUserCommand) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    }
  }

  describe('metadata', () => {
    it('should define metadata correctly', () => {
      const createUserCommandMetadata = getCommandMetadata(CreateUserCommand);
      expect(createUserCommandMetadata).toBeDefined();
      expect(createUserCommandMetadata.id).toBeDefined();

      const deleteUserCommandMetadata = getCommandMetadata(DeleteUserCommand);
      expect(deleteUserCommandMetadata).toBeDefined();
      expect(deleteUserCommandMetadata.id).toBeDefined();
    });
  });

  describe('dispatching', () => {
    it('should dispatch commands correctly', async () => {
      const iocDispatcher = new IoC.Inversify.InvesrifyCommandDispatcher(new Container());

      const isCreated = await iocDispatcher.dispatch(new CreateUserCommand());
      expect(isCreated).toBeTruthy();

      const isDeleted = await iocDispatcher.dispatch(new DeleteUserCommand());
      expect(isDeleted).toBeFalsy();
    });
  });
});

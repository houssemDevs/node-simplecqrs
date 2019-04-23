import 'reflect-metadata';

import { Container, decorate } from 'inversify';

import { ICommand, ICommandHandler, IoC } from '../src';

class CreateUserCommand {}

class DeleteUserCommand {}

class UpdateUserCommand {}

class CommandHandler implements ICommandHandler {
  public exec(c: ICommand): Promise<boolean> {
    if (c instanceof DeleteUserCommand) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
}

decorate(IoC.command, CreateUserCommand);
decorate(IoC.command, DeleteUserCommand);
decorate(IoC.commands(CreateUserCommand, DeleteUserCommand), CommandHandler);

describe('CommandDispatcher', () => {
  describe('dispatching', () => {
    const iocDispatcher = new IoC.Inversify.InvesrifyCommandDispatcher(new Container());

    it('should dispatch commands correctly', async () => {
      const isCreated = await iocDispatcher.dispatch(new CreateUserCommand());
      expect(isCreated).toBeTruthy();

      const isDeleted = await iocDispatcher.dispatch(new DeleteUserCommand());
      expect(isDeleted).toBeFalsy();
    });

    it('should throw when dispatching unhandled command', () => {
      expect(() => iocDispatcher.dispatch(new UpdateUserCommand())).toThrow();
    });
  });
});

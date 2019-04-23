import { Container, decorate, injectable } from 'inversify';

import { ICommand } from '../../command/command';
import { ICommandDispatcher } from '../../command/commanddispatcher';
import {
  getCommandId,
  getCommandsMetadata,
  getObjectConstructor,
} from '../utils';
import { TYPES } from './constants';
import { getCHFromContainer } from './utils';

export class InvesrifyCommandDispatcher implements ICommandDispatcher {
  constructor(private container: Container) {
    const commandsMetadata = getCommandsMetadata();

    const alreadyInjectable: Set<string> = new Set();

    commandsMetadata.forEach((cHandlerMetadata, cId) => {
      if (!alreadyInjectable.has(cHandlerMetadata.name)) {
        decorate(injectable(), cHandlerMetadata.handler);
        alreadyInjectable.add(cHandlerMetadata.name);
      }

      this.container
        .bind(TYPES.commandHandler)
        .to(cHandlerMetadata.handler)
        .whenTargetNamed(cId);
    });
  }

  public dispatch(c: ICommand): Promise<boolean> {
    const h = getCHFromContainer(
      this.container,
      getCommandId(getObjectConstructor(c)),
    );

    if (h) {
      return h.exec(c);
    }

    throw new Error(`No command handler fro ${getObjectConstructor(c)}`);
  }
}

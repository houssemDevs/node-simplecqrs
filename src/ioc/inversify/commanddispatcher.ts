import { Container, decorate, injectable } from 'inversify';

import { ICommandDispatcher } from '../../write/commanddispatcher';
import { ICommandHandler } from '../../write/commandhandler';
import { ICommand } from '../../write/commandobject';
import { METADATA_KEYS } from '../constants';
import { CommandMetadata } from '../types';
import { TYPES } from './constants';

export class InvesrifyCommandDispatcher implements ICommandDispatcher {
  constructor(private container: Container) {
    const commandsMetadata: CommandMetadata[] =
      Reflect.getMetadata(METADATA_KEYS.commands, Reflect) || [];
    commandsMetadata.forEach((cm) => {
      decorate(injectable(), cm.handler);
      this.container
        .bind(TYPES.command)
        .to(cm.handler)
        .whenTargetNamed(cm.name);
    });
  }
  public dispatch(c: ICommand): Promise<boolean> {
    const handler: ICommandHandler = this.container.getNamed(
      TYPES.command,
      Object.getPrototypeOf(c).constructor.name,
    );
    if (handler) {
      return handler.exec(c);
    }
    throw new Error(`No command handler fro ${c}`);
  }
}

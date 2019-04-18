import { Container, decorate, injectable } from 'inversify';

import { ICommandDispatcher } from '../../write/commanddispatcher';
import { ICommand } from '../../write/commandobject';
import { getCHMetadata, getCommandId, getCommandsMetadata, getObjectConstructor, getObjectName } from '../utils';
import { TYPES } from './constants';
import { getCHFromContainer } from './utils';

export class InvesrifyCommandDispatcher implements ICommandDispatcher {
  constructor(private container: Container) {
    const commandHandlersMetadata = getCHMetadata();

    commandHandlersMetadata.forEach((chm) => {
      chm.commands.forEach((cm) => {
        this.container
          .bind(TYPES.command)
          .to(chm.handler)
          .whenTargetNamed(cm.id.valueOf());
      });
    });
  }

  public dispatch(c: ICommand): Promise<boolean> {
    const h = getCHFromContainer(this.container, getCommandId(getObjectConstructor(c)));

    if (h) {
      return h.exec(c);
    }

    throw new Error(`No command handler fro ${getObjectConstructor(c)}`);
  }
}

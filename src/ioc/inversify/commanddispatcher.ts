import { Container, decorate, injectable } from 'inversify';

import { ICommandDispatcher } from '../../write/commanddispatcher';
import { ICommand } from '../../write/commandobject';
import { getCommandsMetadata, getObjectName } from '../utils';
import { TYPES } from './constants';
import { getCHFromContainer } from './utils';

export class InvesrifyCommandDispatcher implements ICommandDispatcher {
  constructor(private container: Container) {
    const commandsMetadata = getCommandsMetadata();

    const alreadyDecoratedHandlers: Set<any> = new Set();

    commandsMetadata.forEach((cm) => {
      if (!alreadyDecoratedHandlers.has(cm.handler)) {
        decorate(injectable(), cm.handler);
        alreadyDecoratedHandlers.add(cm.handler);
      }

      this.container
        .bind(TYPES.command)
        .to(cm.handler)
        .whenTargetNamed(cm.name);
    });
  }

  public dispatch(c: ICommand): Promise<boolean> {
    const h = getCHFromContainer(this.container, getObjectName(c));

    if (h) {
      return h.exec(c);
    }

    throw new Error(`No command handler fro ${c}`);
  }
}

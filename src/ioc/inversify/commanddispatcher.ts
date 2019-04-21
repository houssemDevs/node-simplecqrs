import { Container } from 'inversify';

import { ICommand } from '../../command/command';
import { ICommandDispatcher } from '../../command/commanddispatcher';
import { getCHMetadata, getCommandId, getObjectConstructor } from '../utils';
import { TYPES } from './constants';
import { getCHFromContainer } from './utils';

export class InvesrifyCommandDispatcher implements ICommandDispatcher {
  constructor(private container: Container) {
    const chMetadata = getCHMetadata();

    chMetadata.forEach((chm) => {
      chm.commands.forEach((cm) => {
        this.container
          .bind(TYPES.command)
          .to(chm.handler)
          .whenTargetNamed(cm.id.valueOf());
      });
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

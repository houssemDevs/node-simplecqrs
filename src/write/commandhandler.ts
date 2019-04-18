import { ICommand } from './commandobject';

export interface ICommandHandler {
  exec(c: ICommand): Promise<boolean>;
}

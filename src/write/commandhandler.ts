import { ICommand } from './commandobject';

export interface ICommandHandler<TCommandObject> {
  exec(c: TCommandObject): Promise<boolean>;
}

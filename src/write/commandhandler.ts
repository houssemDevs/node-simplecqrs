import { ICommand } from './command';

export interface ICommandHandler {
  exec(c: ICommand): Promise<boolean>;
}

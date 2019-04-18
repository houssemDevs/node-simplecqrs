import { ICommand } from './command';

export interface ICommandDispatcher {
  dispatch(c: ICommand): Promise<boolean>;
}

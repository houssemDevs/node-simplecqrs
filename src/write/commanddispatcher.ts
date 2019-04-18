import { ICommand } from './commandobject';

export interface ICommandDispatcher {
  dispatch(c: ICommand): Promise<boolean>;
}

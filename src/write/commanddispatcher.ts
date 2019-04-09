export interface ICommandDispatcher<TCommandObject> {
  exec(c: TCommandObject): Promise<boolean>;
}

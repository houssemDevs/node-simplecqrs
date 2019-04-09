export interface ICommandHandler<TCommandObject> {
  exec(c: TCommandObject): Promise<boolean>;
}

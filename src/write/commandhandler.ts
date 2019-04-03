import { Readable } from 'stream';

export interface ICommandHandler<TCommandObject> {
  exec(c: TCommandObject): Promise<boolean>;
  execs(c: TCommandObject[]): Promise<boolean[]>;
  execStream(cs: Readable): Readable;
}

export class CommandHandler<TCommandObject>
  implements ICommandHandler<TCommandObject> {
  public exec(c: TCommandObject): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public execs(c: TCommandObject[]): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }
  public execStream(cs: Readable): Readable {
    throw new Error('Method not implemented.');
  }
}

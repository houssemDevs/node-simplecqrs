import { Readable } from 'stream';

export interface ICommandHandler<TCommandObject> {
  exec(c: TCommandObject): Promise<boolean>;
  execs(c: TCommandObject[]): Promise<boolean[]>;
  execStream(cs: Readable): Readable;
}

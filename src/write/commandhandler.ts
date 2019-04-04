import { Readable } from 'stronger-typed-streams';

import { BooleanStream } from '../utils/booleanStream';

export interface ICommandHandler<TCommandObject> {
  exec(c: TCommandObject): Promise<boolean>;
  execs(c: TCommandObject[]): Promise<boolean[]>;
  execStream(cs: Readable<TCommandObject>): Readable<boolean>;
}

export abstract class CommandHandler<TCommandObject>
  implements ICommandHandler<TCommandObject> {
  public abstract exec(c: TCommandObject): Promise<boolean>;
  public execs(c: TCommandObject[]): Promise<boolean[]> {
    return new Promise((res) => {
      const results: Array<Promise<boolean>> = [];
      c.forEach((command) => results.push(this.exec(command)));
      Promise.all(results)
        .then((r) => res(r))
        .catch((e) => res([]));
    });
  }
  public execStream(cs: Readable<TCommandObject>): Readable<boolean> {
    const rs = new BooleanStream({ objectMode: true });
    cs.on('data', (d: TCommandObject) => {
      this.exec(d)
        .then((b) => rs.push(b))
        .catch((err) => rs.push(false));
    });
    return rs;
  }
}

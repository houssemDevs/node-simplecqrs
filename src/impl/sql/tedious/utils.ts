import { Readable } from 'stronger-typed-streams';
import { ConnectionConfig } from 'tedious';

// tslint:disable-next-line: interface-name
export interface TdsConnectionConfig extends ConnectionConfig {
  authentication: {
    type?: string;
    options: {
      userName: string;
      password: string;
      domain?: string;
    };
  };
}

export class EntityStream<TEntity> extends Readable<TEntity> {
  // tslint:disable-next-line: no-empty
  public _read(size: number) {}
}

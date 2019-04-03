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

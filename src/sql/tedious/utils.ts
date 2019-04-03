import { ConnectionConfig } from 'tedious';

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

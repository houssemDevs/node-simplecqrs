export interface MessageMetadata {
  id: Symbol;
}

export interface QueryMetadata extends MessageMetadata {}

export interface CommandMetadata extends MessageMetadata {}

export type QueriesMetadata = Map<symbol, QueryHandlerMetadata>;

export type CommandsMetadata = Map<symbol, CommandHandlerMetadata>;

export interface QueryHandlerMetadata {
  name: string;
  handler: any;
}

export interface CommandHandlerMetadata {
  name: string;
  handler: any;
}

export interface IError {
  code: number;
  type: string;
  message: string;
}

export class IoCError implements IError {
  public code: number;
  public type: string;
  public message: string;
  constructor(code: number, type: string, message: string) {
    this.code = code;
    this.type = type;
    this.message = message;
  }
}

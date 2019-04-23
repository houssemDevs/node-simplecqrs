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

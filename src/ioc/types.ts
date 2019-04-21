export interface MessageMetadata {
  id: Symbol;
}

export interface QueryMetadata extends MessageMetadata {}

export interface CommandMetadata extends MessageMetadata {}

export interface QueryHandlerMetadata {
  name: string;
  queries: QueryMetadata[];
  handler: any;
}

export interface CommandHandlerMetadata {
  name: string;
  commands: CommandMetadata[];
  handler: any;
}

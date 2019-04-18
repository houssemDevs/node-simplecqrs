export interface QueryMetadata {
  id: Symbol;
}

export interface CommandMetadata {
  id: Symbol;
}

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

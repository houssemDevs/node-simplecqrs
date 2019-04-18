export interface QueryMetadata {
  name: string;
  id: Symbol;
  handler: any;
}

export interface CommandMetadata {
  name: string;
  id: Symbol;
  handler: any;
}

export interface QueryHandlerMetadata {
  name: string;
  queries: QueryMetadata[];
  handler: any;
}

export interface CommandHandlerMetadata {
  name: string;
  commands: string[];
  target: any;
}

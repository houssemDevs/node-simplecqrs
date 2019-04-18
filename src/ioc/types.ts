export interface QueryMetadata {
  name: string;
  query: Function;
  handler: any;
}

export interface CommandMetadata {
  name: string;
  command: Function;
  handler: any;
}

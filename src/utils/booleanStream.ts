import { Readable } from 'stronger-typed-streams';

export class BooleanStream extends Readable<boolean> {
  // tslint:disable-next-line: no-empty
  public _read(size: number) {}
}

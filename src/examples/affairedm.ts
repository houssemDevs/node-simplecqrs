import { ColumnValue } from 'tedious';

import { Affaire } from './affaire';
import { ITdsDataMapper } from '../sql/tedious/datamapper';

export class AffaireTdsDataMapper implements ITdsDataMapper<Affaire> {
  toDestination(s: ColumnValue[]): Affaire {
    return new Affaire(s[0].value, s[1].value);
  }
  toSource(d: Affaire): ColumnValue[] {
    return [];
  }
}

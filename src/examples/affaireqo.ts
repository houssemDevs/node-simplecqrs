import { SqlQuery } from '../sql/queryobject';

export class GetAffaireSqlQuery extends SqlQuery {
  constructor() {
    super();
  }
  toExpression(): string {
    const root = 'SELECT Code_Affaire, IntituleAffaire FROM Taffaire';
    if (this.currentCriteriaGroup.length >= 1) {
      this.criteriaGroups.push(this.currentCriteriaGroup);
      this.currentCriteriaGroup = [];
    }
    let whereClause = '';
    this.criteriaGroups.forEach(grp => {
      if (whereClause.length === 0) {
        whereClause += 'WHERE ';
        whereClause += `(${grp.map(c => c.toExpression()).join(' AND ')})`;
      } else {
        whereClause += ` OR (${grp.map(c => c.toExpression()).join(' AND ')})`;
      }
    });
    return `${root} ${whereClause};`;
  }
}

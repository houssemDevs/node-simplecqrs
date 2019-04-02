import { TdsQueryHandler } from '../sql/tedious/queryhandler';
import { Affaire } from './affaire';
import { AffaireTdsDataMapper } from './affairedm';
import { GetAffaireSqlQuery } from './affaireqo';
import { SqlCriteria } from '../sql/criteria';
import { PassThrough, Transform } from 'stream';

const affaire = new TdsQueryHandler<Affaire>(
  {
    server: 'localhost',
    authentication: {
      type: 'default',
      options: {
        userName: 'sa',
        password: '1.0.5.1dre2015',
      },
    },
    options: {
      database: 'RCTC_CONSOLID_DRE',
      encrypt: false,
    },
  },
  new AffaireTdsDataMapper()
);

const query = new GetAffaireSqlQuery()
  .addCriteria(SqlCriteria.eq('Code_Affaire', "'2018250025'"))
  .beginNewGroup()
  .addCriteria(SqlCriteria.eq('Code_Affaire', "'2018230025'"));

console.log(query.toExpression());

const pass = new Transform({ objectMode: true });
pass.setEncoding('utf8');
pass._transform = (data, encoding, done) => {
  pass.push(JSON.stringify(data));
  done();
};

affaire
  .getStream(query)
  .pipe(pass)
  .pipe(process.stdout);

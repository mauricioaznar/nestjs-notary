import fs = require('fs');
import { connectionOptions, typeOrmCliOptions } from '../app.module';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify({ ...connectionOptions, ...typeOrmCliOptions }, null, 2),
);

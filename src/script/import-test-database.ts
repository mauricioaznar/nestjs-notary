import * as Importer from 'mysql-import';

(async function () {
  const importer = new Importer({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  });

  importer.onProgress((progress) => {
    const percent =
      Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) /
      100;
    console.log(`${percent}% Completed`);
  });

  try {
    await importer.import(__dirname + '/test-database.sql');
  } catch (e) {
    console.log(e);
  }

  const files_imported = importer.getImported();

  console.log(`${files_imported.length} SQL file(s) imported.`);

  importer.disconnect();
})();

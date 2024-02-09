const app = require('./app');
require('./database');

async function main() {
  try {
    await app.listen(app.get('port'));
  } catch (e) { console.log(e); }
  console.log('Server running on: ', app.get('port'));
}

main();

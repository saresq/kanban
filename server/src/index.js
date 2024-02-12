const app = require('./app');
require('./database');

async function main() {
  try {
    const port = app.get('port');
    app.listen(port, () => {
      console.log('Server running on port:', port);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

main();

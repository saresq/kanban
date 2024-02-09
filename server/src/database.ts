const mongoose = require('mongoose');

const {
  MONGO_HOSTNAME,
  MONGO_DB,
  MONGO_PORT,
} = process.env;

const dbConnectionURL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

mongoose.connect(dbConnectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

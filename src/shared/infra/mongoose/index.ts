import mongoose from 'mongoose';
import dbConfig from '@config/db';

switch (process.env.DB_DRIVER) {
  case 'localhost':
    mongoose.connect(dbConfig.uri.localhost, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    break;

  case 'atlas':
    mongoose.connect(dbConfig.uri.atlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    break;

  default:
    mongoose.connect(dbConfig.uri.localhost, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    break;
}

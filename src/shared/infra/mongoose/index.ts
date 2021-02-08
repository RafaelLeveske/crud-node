import mongoose from 'mongoose';

const {
  MONGO_DB_USER,
  MONGO_DB_PASS,
  MONGO_DB_DATABASE_NAME,
  MONGO_DB_HOST,
} = process.env;

mongoose.connect(
  'mongodb+srv://rafael:iYPebzZp1uFrtsmA@cluster0.a7sz7.mongodb.net/crudnode?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

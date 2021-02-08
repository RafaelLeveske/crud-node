import mongoose from 'mongoose';

const {
  MONGO_DB_USER,
  MONGO_DB_PASS,
  MONGO_DB_DATABASE_NAME,
  MONGO_DB_HOST,
} = process.env;

mongoose.connect(
  `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_HOST}.mongodb.net/${MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

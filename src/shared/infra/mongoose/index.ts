import mongoose from 'mongoose';

mongoose.connect(
  `mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

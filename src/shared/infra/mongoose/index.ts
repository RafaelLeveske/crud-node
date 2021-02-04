import mongoose from 'mongoose';

mongoose.connect(String(process.env.MONGO_DB_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

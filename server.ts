import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

process.on('uncaughtException', (err) => {
  console.log(
    `UNCAUGHT EXCEPTION! 💥 Shutting down...\n Error name: ${err.name} \nError message: ${err.message}`
  );
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const db: string = process.env.DATABASE as string;
const db_password: string = process.env.DATABASE_PASSWORD as string;
const DB = db.replace('<PASSWORD>', db_password);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(`UNHANDLED REJECTION! 💥 Shutting down... \nError name: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});

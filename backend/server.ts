import express from 'express';
import * as dotenv from 'dotenv';
import goalRoutes from './routes/Goal';
import errorHandler from './middleware/errorHandler';
import mongoose from 'mongoose';
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

const app = express();

//connect to DB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('DB connected');
    startServer();
  })
  .catch(error => console.log(error));

//only start the server if DB connects
const startServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/goals', goalRoutes);

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

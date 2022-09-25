import express from 'express';
import * as dotenv from 'dotenv';
import goalRoutes from './routes/Goal';
import errorHandler from './middleware/errorMiddleware';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

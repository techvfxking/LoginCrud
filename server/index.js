import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { router } from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
app.listen(5000, () => console.log('Server has started on http://localhost:5000'));

let mongooseConnect;
try {
    mongooseConnect = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let connectionState = mongooseConnect.connection.readyState;
    if (connectionState === mongooseConnect.ConnectionStates.connected)
        console.log("Connected");
} catch (error) {
    console.log(error);
}



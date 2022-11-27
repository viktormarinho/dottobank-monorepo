import express from 'express';
import cors from 'cors';
import auth from './auth';

const app = express();

app.use(cors());
app.use(auth.router);
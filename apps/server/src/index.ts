import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import auth from './auth';
import website from './website';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth.router);
app.use('/web', website.router);
app.use(express.static('public'))

app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000')
})
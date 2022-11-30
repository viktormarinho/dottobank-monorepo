import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import auth from './auth';
import website from './website';
import webapp from './webapp';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth.router);
app.use('/web', website.router);
app.use('/app', webapp.router);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server listening at http://localhost:' + PORT);
})
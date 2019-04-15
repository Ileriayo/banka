import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to Banka'));

app.listen(port, host, () => {
  console.log(`Banka is listening on ${host}:${port}`);
});

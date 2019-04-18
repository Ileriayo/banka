import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.routes';
import accountRoutes from './routes/accounts.routes';

const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome to Banka'));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/accounts', accountRoutes);

app.listen(port, () => {
  console.log(`Banka is listening on ${port}`);
});

export default app;

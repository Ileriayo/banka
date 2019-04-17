import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome to Banka'));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/auth', adminRoutes);

app.listen(port, host, () => {
  console.log(`Banka is listening on ${host}:${port}`);
});

export default app;

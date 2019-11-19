import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/RootController';
import './controllers/LoginController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['1ndjddj'] }));
app.use(AppRouter.instance);

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

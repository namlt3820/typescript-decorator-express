import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router } from './routes/loginRoutes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['1ndjddj'] }));
app.use(router);

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

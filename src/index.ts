import express from 'express';

import routes from './routes';
import authConfig from './authentication/authConfig';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

//authConfig(app);

app.use(routes);

app.listen(3333, () => {
    console.log("app running on port 3333");
});

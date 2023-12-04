require('dotenv').config();
import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/styles.css', (req, res) => {
  res.type('text/css');
  res.sendFile(__dirname + '/styles.css');
});
app.use(express.json())
app.use(routes);

export default app;


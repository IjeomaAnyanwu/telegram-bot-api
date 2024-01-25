import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import {sequelize} from "./config/dbConfig"
import routes from './routes';

config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }).catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


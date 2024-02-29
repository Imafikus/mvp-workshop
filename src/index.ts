import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';

import { listen } from './eventListeners';

dotenv.config();

const app: Application = express();
const port = 8000;

// set up server
app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});


// set up event listeners
listen();

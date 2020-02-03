import express from 'express';
import path from 'path';
import {wire} from './routes';

const app = express();
const port = 4242;

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('bar');
  res.sendFile(path.resolve('./dist/index.html'));
});

app.get('/bundle.js', (req: express.Request, res: express.Response) => {
  console.log('foo');
  res.sendFile(path.resolve('./dist/bundle.js'));
});

wire(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
import express from 'express';
import path from 'path';
import {wire} from './routes';
import {connect} from './MongoAdapter'

connect();
const app = express();
const port = 4242;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('bar');
  res.sendFile(path.resolve('./dist/index.html'));
});

app.get('/bundle.js', (req: express.Request, res: express.Response) => {
  console.log('foo');
  res.sendFile(path.resolve('./dist/bundle.js'));
});
app.get('/bootstrap.css', (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve('./node_modules/bootstrap/dist/css/bootstrap.css'));
});

wire(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
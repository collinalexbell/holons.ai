import {Express, Request, Response} from 'express';

enum Method {GET, POST}

type Path = string;
type Handler = (req: Request, res: Response) => void;

class Route {
  method: Method;
  path: Path;
  handler: Handler;
  constructor(method: Method, path: Path, handler: Handler) {
    this.method = method;
    this.path = path;
    this.handler = handler;
  }

  addToApp(app: Express) {
    switch(this.method) {
      case Method.GET:
        app.get(this.path, this.handler);
        break;
      case Method.POST:
        app.post(this.path, this.handler);
        break;
    }
  }
}

const routes: Route[] = [
    new Route(Method.GET, "/keyResult", function(req, res){
      res.send("hello world");
    }),
];

function wireRoutes(app: Express): void {
  routes.forEach((val) => {
    val.addToApp(app);
  });
}

export default wireRoutes
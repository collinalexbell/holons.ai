import {Request, Response} from "express";

enum Method {GET, POST}

type Path = string;

type Handler = (req: Request, res: Response) => void;

interface App {
  // Interface works with Express and this is the express type.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (path: Path, handler: Handler) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: (path: Path, handler: Handler) => any;
}

interface Route {
  addToApp(app: App): void;
}

class ExpressRoute implements Route{
  method: Method;
  path: Path;
  handler: Handler;
  constructor(method: Method, path: Path, handler: Handler) {
    this.method = method;
    this.path = path;
    this.handler = handler;
  }

  addToApp(app: App): void {
    const {method: method1} = this;
    switch(method1) {
      case Method.GET:
        app.get(this.path, this.handler);
        break;
      case Method.POST:
        app.post(this.path, this.handler);
        break;
    }
  }
}

const defaultRoutes: Route[] = [
    new ExpressRoute(Method.GET, "/keyResult", function(req, res){
      res.send("hello world");
    }),
];

function wire(app: App, routes: Route[] = defaultRoutes): void {
  routes.forEach((val) => {
    val.addToApp(app);
  });

}

export {Method, Path, Handler, Route, App, ExpressRoute, wire};

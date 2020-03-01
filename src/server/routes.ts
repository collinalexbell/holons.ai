import {Request, Response} from "express";
import KeyResultModel from './KeyResult'
import KeyResult, {KeyResultInMem} from "../common/KeyResult";
import {ObjectiveInMem} from "../common/Objective";
import ObjectiveModel from "./Objective"

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
    new ExpressRoute(Method.GET, "/keyResult/:id", function(req, res){
      const kr = KeyResultModel.get(req.params['id']);
      kr.then((kr) => {
        const krInMem = KeyResultInMem.fromInterface(kr);
        res.set('Content-Type', 'text/json');
        res.send(krInMem.toJSON())
      }).catch(() => res.send('{}'))
    }),

    new ExpressRoute(Method.POST, "/keyResult", function(req, res) {
      const kr = KeyResultInMem.fromObj(req.body);
      const saved = KeyResultModel.save(kr);
      saved.then((dbKR) => {
        res.status(200);
        res.set("Content-Type", "text/json");
        res.send(dbKR.toJSON())
      }).catch((reason) => res.send(reason))
    }),

    new ExpressRoute(Method.POST, "/objective", function(req, res) {
      console.log(req.body)
      const objective = ObjectiveInMem.fromObj(req.body);
      const saved = ObjectiveModel.save(objective);
      saved.then((dbObjective) => {
        res.status(200) ;
        res.set("Content-Type", "text/json");
        res.send(dbObjective.toJSON());
      }).catch((reason) => res.send(reason));
    }),

    new ExpressRoute(Method.GET, "/objective/:id", function(req, res){
      const objective = ObjectiveModel.get(req.params['id']);
      objective.then((objective) => {
        const objectiveInMem = ObjectiveInMem.fromInterface(objective);
        res.set('Content-Type', 'text/json');
        res.send(objectiveInMem.toJSON())
      }).catch(() => res.send('{}'))
    })
];

function wire(app: App, routes: Route[] = defaultRoutes): void {
  routes.forEach((val) => {
    val.addToApp(app);
  });

}

export {Method, Path, Handler, Route, App, ExpressRoute, wire};

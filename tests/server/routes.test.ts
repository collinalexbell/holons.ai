import {Method, App, wire, RouteImp} from '../../src/server/routes';
jest.unmock('../../src/server/routes');

describe('routes()', () => {
  const app: App = {get: jest.fn(), post: jest.fn()} ;
  it('calls app.get for a get route', () => {
    const fn = jest.fn();
    const get = new RouteImp(Method.GET, '/', fn);
    wire(app, [get]);
    expect(app.get).toBeCalledWith('/', fn);
  });
});
import * as React from 'react';
import { createStore, Action} from 'redux'
import * as ReactDOM from 'react-dom';
import KeyResultModel from '../common/KeyResult'
import {KeyResult} from "./KeyResult";
import {Provider} from "react-redux";
import State from './State'

const reducer = function(state: State = {KeyResults: {}}, action: Action): State {
  return state;
};

const store = createStore(reducer,
    {
      KeyResults: {
        0: new KeyResultModel(0, 0.7, "This is passing"),
        1: new KeyResultModel(1, 0.6, "This is middling"),
        2: new KeyResultModel(2, 0.3, "This is failing"),
      }
    });

ReactDOM.render(
    <Provider store={store}>
      <KeyResult id={0} />
      <KeyResult id={1} />
      <KeyResult id={2} />
    </Provider>,
    document.getElementById('root'),
);


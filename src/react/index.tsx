import * as React from 'react';
import {createStore, combineReducers} from 'redux'
import * as ReactDOM from 'react-dom';
import KeyResultModel from '../common/KeyResult'
import {Provider} from "react-redux";
import {State} from './State'
import {keyResultsReducer} from "./redux/KeyResultsReducer";
import {ObjectiveComponent} from "./Objective";

const reducer = combineReducers({
  KeyResults: keyResultsReducer
});

const init: State = {
  KeyResults: {
    0: new KeyResultModel(0, 0.7, "This is passing"),
    1: new KeyResultModel(1, 0.6, "This is middling"),
    2: new KeyResultModel(2, 0.3, "This is failing"),
  }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const store = createStore(reducer, init);

ReactDOM.render(
    <Provider store={store}>
      <ObjectiveComponent description='passing' krIds={[0, 1]}/>
      <ObjectiveComponent description='failing' krIds={[2]}/>
      <ObjectiveComponent description='noKRs' krIds={[]}/>
    </Provider>,
    document.getElementById('root'),
);


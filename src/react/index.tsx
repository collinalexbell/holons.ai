import * as React from 'react';
import {createStore, combineReducers} from 'redux'
import * as ReactDOM from 'react-dom';
import KeyResult, {KeyResultStubbed, KeyResultInMem} from '../common/KeyResult'
import ObjectiveModel from '../common/Objective'
import {Provider} from "react-redux";
import {State} from './State'
import {keyResultsReducer, addKeyResultAction} from "./redux/KeyResultsReducer";
import OkrList from "./OkrList";
import objectiveReducer, {addObjectiveAction} from "./redux/ObjectiveReducer";

const reducer = combineReducers({
  KeyResults: keyResultsReducer,
  Objectives: objectiveReducer
});



const init: State = {
  KeyResults: {},
  Objectives: []
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const store = createStore(reducer, init);

function krResolver(id: number): KeyResult {
  const state: State = store.getState();
  return state.KeyResults[id];
}

store.dispatch(addKeyResultAction(new KeyResultInMem(0, 0.7, 'passing')));
store.dispatch(addKeyResultAction(new KeyResultInMem(1, 0.5, 'middling')));
store.dispatch(addKeyResultAction(new KeyResultInMem(2, 0.3, 'failing')));

store.dispatch(addObjectiveAction(new ObjectiveModel( 'passing')
    .addKR(new KeyResultStubbed(0, krResolver))
    .addKR(new KeyResultStubbed(1, krResolver))));

store.dispatch(addObjectiveAction(new ObjectiveModel('failing')
    .addKR(new KeyResultStubbed(2, krResolver))));

store.dispatch(addObjectiveAction(new ObjectiveModel( 'noKRs')));

ReactDOM.render(
    <Provider store={store}>
      <OkrList />
    </Provider>,
    document.getElementById('root'),
);


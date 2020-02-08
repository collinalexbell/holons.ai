import {KeyResults} from "../State";
import {ID as KeyResultID} from "../../common/KeyResult";
import {Dispatch} from 'redux';
import {Reducer} from "react";

// Str -> Const, for IDE support
const UPDATE_KEY_RESULT_SCORE = 'UPDATE_KEY_RESULT_SCORE';

type KEY_RESULT_SCORE_UPDATE = {type: string; keyResultID: KeyResultID; score: number};
export const updateKeyResultScore = (dispatch: Dispatch, keyResultID: number, score: number): void => {
  dispatch({
    type: UPDATE_KEY_RESULT_SCORE,
    keyResultID,
    score
  });
};

export type Actions = KEY_RESULT_SCORE_UPDATE;
export const keyResultsReducer: Reducer<KeyResults, Actions> = (state: KeyResults = {}, action: Actions): KeyResults => {
  const newState = Object.assign({}, state);
  if (action.type === UPDATE_KEY_RESULT_SCORE) {
    const update: KEY_RESULT_SCORE_UPDATE = action;
    newState[update.keyResultID].score = update.score;
    return newState;
  }
  return state;
};


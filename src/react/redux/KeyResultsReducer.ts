import {KeyResults} from "../State";
import {ID as KeyResultID, KeyResultInMem} from "../../common/KeyResult";
import {Dispatch} from 'redux';
import {Reducer} from "react";

// Str -> Const, for IDE support
const UPDATE_KEY_RESULT_SCORE = 'UPDATE_KEY_RESULT_SCORE';
const ADD_KEY_RESULT = 'ADD_KEY_RESULT';

type KEY_RESULT_SCORE_UPDATE = {type: string; keyResultID: KeyResultID; score: number};
export const updateKeyResultScore = (dispatch: Dispatch, keyResultID: number, score: number): void => {
  dispatch({
    type: UPDATE_KEY_RESULT_SCORE,
    keyResultID,
    score
  });
};

type KEY_RESULT_ADD_ACTION = {type: string; kr: KeyResultInMem}
export const addKeyResultAction = (kr: KeyResultInMem): KEY_RESULT_ADD_ACTION => {
  return {
    type: ADD_KEY_RESULT,
    kr: kr
  };
};

export type Actions = KEY_RESULT_SCORE_UPDATE | KEY_RESULT_ADD_ACTION;
export const keyResultsReducer: Reducer<KeyResults, Actions> = (state: KeyResults = {}, action: Actions): KeyResults => {
  const newState = Object.assign({}, state);
  if (action.type === UPDATE_KEY_RESULT_SCORE) {
    const update: KEY_RESULT_SCORE_UPDATE = action as KEY_RESULT_SCORE_UPDATE;
    newState[update.keyResultID].updateScore(update.score);
  } else if (action.type === ADD_KEY_RESULT) {
    const update: KEY_RESULT_ADD_ACTION = action as KEY_RESULT_ADD_ACTION;
    newState[update.kr.id()] = update.kr;
  }
  return newState;
};


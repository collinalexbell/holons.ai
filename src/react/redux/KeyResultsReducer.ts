import {KeyResults} from "../State";
import {ID as KeyResultID, KeyResultInMem} from "../../common/KeyResult";
import {Dispatch} from 'redux';
import {Reducer} from "react";

// Str -> Const, for IDE support
const UPDATE_KEY_RESULT_SCORE = 'UPDATE_KEY_RESULT_SCORE';
const ADD_KEY_RESULT = 'ADD_KEY_RESULT';
const EDIT_KEY_RESULT_DESCRIPTION = 'EDIT_KEY_RESULT_DESCRIPTION';

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

type EDIT_KEY_RESULT_DESCRIPTION_ACTION = {type: string; krId: number; newDescription: string}
export const editKeyResultDescriptionAction = (krId: number, newDescription: string) => {
  return {
    type: EDIT_KEY_RESULT_DESCRIPTION,
    krId: krId,
    newDescription: newDescription
  }
};

export type Actions = KEY_RESULT_SCORE_UPDATE | KEY_RESULT_ADD_ACTION | EDIT_KEY_RESULT_DESCRIPTION_ACTION;
export const keyResultsReducer: Reducer<KeyResults, Actions> = (state: KeyResults = {}, action: Actions): KeyResults => {
  const newState = Object.assign({}, state);
  if (action.type === UPDATE_KEY_RESULT_SCORE) {
    const update: KEY_RESULT_SCORE_UPDATE = action as KEY_RESULT_SCORE_UPDATE;
    newState[update.keyResultID].updateScore(update.score);
  } else if (action.type === ADD_KEY_RESULT) {
    const update: KEY_RESULT_ADD_ACTION = action as KEY_RESULT_ADD_ACTION;
    newState[update.kr.id()] = update.kr;
    console.log(update.kr);
  } else if (action.type === EDIT_KEY_RESULT_DESCRIPTION) {
    const update: EDIT_KEY_RESULT_DESCRIPTION_ACTION = action as EDIT_KEY_RESULT_DESCRIPTION_ACTION;
    console.log(newState);
    console.log(update.krId);
    newState[update.krId].setDescription(update.newDescription);
  }
  return newState;
};


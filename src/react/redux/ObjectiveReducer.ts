
// Str -> Const, for IDE support
import {Objectives} from "../State";
import {Reducer} from "react";
import Objective from "../../common/Objective";
import {KeyResultStubbed} from "../../common/KeyResult";

const ADD_OBJECTIVE = 'ADD_OBJECTIVE';
const EDIT_OBJECTIVE_DESCRIPTION = 'EDIT_OBJECTIVE_DESCRIPTION';
const OBJECTIVE_ADD_KEY_RESULT = 'OBJECTIVE_ADD_KEY_RESULT';

type OBJECTIVE_ADD_ACTION = {type: string; objective: Objective}
export const addObjectiveAction = (objective: Objective): OBJECTIVE_ADD_ACTION => {
  return {
    type: ADD_OBJECTIVE,
    objective: objective,
  };
};

type ACTION_OBJECTIVE_EDIT_DESCRIPTION = {type: string; objectiveId: number; description: string};
export const editObjectiveDescriptionAction = (objectiveId: number, description: string): ACTION_OBJECTIVE_EDIT_DESCRIPTION => {
  return {
    type: EDIT_OBJECTIVE_DESCRIPTION,
    objectiveId: objectiveId,
    description: description
  }
};

type ACTION_OBJECTIVE_ADD_KEY_RESULT = {type: string; objectiveId: number; kr: KeyResultStubbed}
export const addKeyResultToObjectiveAction= (objectiveId: number, kr: KeyResultStubbed): ACTION_OBJECTIVE_ADD_KEY_RESULT => {
  return {
    type: OBJECTIVE_ADD_KEY_RESULT,
    objectiveId: objectiveId,
    kr: kr
  }
};

export type Actions = OBJECTIVE_ADD_ACTION | ACTION_OBJECTIVE_EDIT_DESCRIPTION | ACTION_OBJECTIVE_ADD_KEY_RESULT;
export const objectiveReducer: Reducer<Objectives, Actions> = (state: Objectives = [], action: Actions): Objectives => {
  const newState = state.slice();
  if (action.type === ADD_OBJECTIVE) {
    const update: OBJECTIVE_ADD_ACTION = action as OBJECTIVE_ADD_ACTION;
    update.objective.setID(newState.length);
    newState.push(update.objective);
  } else if (action.type === EDIT_OBJECTIVE_DESCRIPTION) {
    const update:  ACTION_OBJECTIVE_EDIT_DESCRIPTION = action as ACTION_OBJECTIVE_EDIT_DESCRIPTION;
    newState[update.objectiveId].description = update.description;
  } else if (action.type === OBJECTIVE_ADD_KEY_RESULT) {
    const update: ACTION_OBJECTIVE_ADD_KEY_RESULT = action as ACTION_OBJECTIVE_ADD_KEY_RESULT;
    if(update.objectiveId >= 0)
      newState[update.objectiveId].addKR(update.kr);
  }
  return newState;
};

export default objectiveReducer;

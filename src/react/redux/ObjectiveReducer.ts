
// Str -> Const, for IDE support
import {Objectives} from "../State";
import {Reducer} from "react";
import Objective from "../../common/Objective";

const ADD_OBJECTIVE = 'ADD_OBJECTIVE';
const EDIT_OBJECTIVE_DESCRIPTION = 'EDIT_OBJECTIVE_DESCRIPTION';

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

export type Actions = OBJECTIVE_ADD_ACTION | ACTION_OBJECTIVE_EDIT_DESCRIPTION;
export const objectiveReducer: Reducer<Objectives, Actions> = (state: Objectives = [], action: Actions): Objectives => {
  const newState = state.slice();
  if (action.type === ADD_OBJECTIVE) {
    const update: OBJECTIVE_ADD_ACTION = action as OBJECTIVE_ADD_ACTION;
    update.objective.setID(newState.length);
    newState.push(update.objective);
  } else if (action.type === EDIT_OBJECTIVE_DESCRIPTION) {
    const update:  ACTION_OBJECTIVE_EDIT_DESCRIPTION = action as ACTION_OBJECTIVE_EDIT_DESCRIPTION;
    newState[update.objectiveId].description = update.description;
  }
  return newState;
};

export default objectiveReducer;

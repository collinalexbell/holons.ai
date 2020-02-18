
// Str -> Const, for IDE support
import {Objectives} from "../State";
import {Reducer} from "react";
import Objective from "../../common/Objective";

const ADD_OBJECTIVE = 'ADD_OBJECTIVE';

type OBJECTIVE_ADD_ACTION = {type: string; objective: Objective}
export const addObjectiveAction = (objective: Objective): OBJECTIVE_ADD_ACTION => {
  return {
    type: ADD_OBJECTIVE,
    objective: objective,
  };
};

export type Actions = OBJECTIVE_ADD_ACTION;
export const objectiveReducer: Reducer<Objectives, Actions> = (state: Objectives = [], action: Actions): Objectives => {
  const newState = state.slice();
  if (action.type === ADD_OBJECTIVE) {
    const update: OBJECTIVE_ADD_ACTION = action as OBJECTIVE_ADD_ACTION;
    newState.push(update.objective);
  }
  return newState;
};

export default objectiveReducer;

import {KeyResultInMem} from "../common/KeyResult";
import Objective from "../common/Objective";

type KeyResults = {[key: number]: KeyResultInMem}
type Objectives = Objective[]

interface State {
  KeyResults: KeyResults;
  Objectives: Objectives;
}

export {Objectives, KeyResults, State}
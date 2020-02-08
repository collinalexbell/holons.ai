import KeyResult from "../common/KeyResult";

type KeyResults = {[key: number]: KeyResult}

interface State {
  KeyResults: KeyResults;
}

export {KeyResults, State}
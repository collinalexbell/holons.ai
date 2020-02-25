import KeyResult from "./KeyResult";

type ID = string
interface Objective {
  id(): ID;
  description(): string;
  keyResults(): KeyResult[];
}

class ObjectiveInMem implements Objective{
  _id: ID;
  _description: string;
  _keyResults: KeyResult[];
  constructor(description: string) {
    this._id = "";
    this._description = description ;
    this._keyResults = [];
  }

  static fromObj(obj: {id?: ID; description: string}): Objective {
    const objective = new ObjectiveInMem(obj.description);
    if(obj.id) {
      objective.setID(obj.id);
    }
    return objective;
  }

  static fromInterface(obj: Objective): ObjectiveInMem {
    const objective = new ObjectiveInMem(obj.description());
    if(obj.id()) {
      objective.setID(obj.id());
    }
    return objective;
  }

  description(): string {
    return this._description;
  }

  id(): ID {
    return this._id
  }

  setID(id: ID): void {
    this._id = id;
  }

  addKR(kr: KeyResult): Objective {
    this._keyResults.push(kr);
    return this;
  }

  getKRs(): KeyResult[] {
    return this._keyResults;
  }

  score(): number {
    let sum = 0;
    for(const kr of this._keyResults){
      sum += kr.score();
    }
    return sum/this.keyResults.length;
  }

  removeKR(toRm: KeyResult): void {
    this._keyResults = this._keyResults.filter((kr) => kr.id != toRm.id);
  }

  keyResults(): KeyResult[] {
    return [];
  }
  toJSON(): string {
    return JSON.stringify({id: this.id(), description: this.description()});
  }
}

export default Objective;
export {ObjectiveInMem, ID};
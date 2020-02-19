import KeyResult from "./KeyResult";

class Objective {
  id: number;
  description: string;
  keyResults: KeyResult[];
  constructor(description: string) {
    this.id = -1;
    this.description = description ;
    this.keyResults = [];
  }

  setID(id: number): void {
    this.id = id;
  }

  addKR(kr: KeyResult): Objective {
    this.keyResults.push(kr);
    return this;
  }

  getKRs(): KeyResult[] {
    return this.keyResults;
  }

  score(): number {
    let sum = 0;
    for(const kr of this.keyResults){
      sum += kr.score();
    }
    return sum/this.keyResults.length;
  }

  removeKR(toRm: KeyResult): void {
    this.keyResults = this.keyResults.filter((kr) => kr.id != toRm.id);
  }
}

export default Objective;
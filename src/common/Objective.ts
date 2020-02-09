import KeyResult from "./KeyResult";

class Objective {
  description: string;
  keyResults: KeyResult[];
  constructor(description: string) {
    this.description = description ;
    this.keyResults = [];
  }

  addKR(kr: KeyResult): void {
    this.keyResults.push(kr)
  }

  getKRs(): KeyResult[] {
    return this.keyResults;
  }

  score(): number {
    let sum = 0;
    for(const kr of this.keyResults){
      sum += kr.score;
    }
    return sum/this.keyResults.length;
  }

  removeKR(toRm: KeyResult): void {
    this.keyResults = this.keyResults.filter((kr) => kr.id != toRm.id);
  }
}

export default Objective;
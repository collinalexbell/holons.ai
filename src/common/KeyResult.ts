type ID = number

class KeyResult {
  id: ID;
  score: number;
  description: string;

  constructor(id: number, score: number, description: string) {
    this.id = id;
    this.score = score;
    this.description = description;
  }
}

export default KeyResult;
export {ID}

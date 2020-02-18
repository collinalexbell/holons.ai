type ID = number

interface KeyResult {
  id(): ID;
  score(): number;
  updateScore(score: number): void;
  description(): string;
}

type ResolveById = (id: number) => KeyResult;
class KeyResultStubbed {
  model = "KeyResult";
  _id: ID;
  resolve: ResolveById;
  constructor(id: number, unstubResolver: ResolveById) {
    this._id = id;
    this.resolve = unstubResolver;
  }
  id(): ID {
    return this._id;
  }

  score(): number {
    const kr = this.resolve(this.id());
    return kr.score();
  }

  description(): string {
    const kr = this.resolve(this.id());
    return kr.description();
  }

  updateScore(score: number): void {
    const kr = this.resolve(this.id());
    kr.updateScore(score);
  }
}

class KeyResultInMem {
  _id: ID;
  _score: number;
  _description: string;

  constructor(id: number, score: number, description: string) {
    this._id = id;
    this._score = score;
    this._description = description;
  }

  id(): ID {
    return this._id;
  }

  updateScore(newScore: number): void {
    this._score = newScore;
  }

  score(): number {
    return this._score;
  }

  description(): string {
    return this._description;
  }
}

export default KeyResult;
export {ID, KeyResultStubbed, KeyResultInMem}

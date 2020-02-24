type ID = number

let id = -1;

function getNewId(): number {
  return ++id;
}

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

  static fromObj(kr: {id: ID; score: number; description: string}) {
    return new KeyResultInMem(kr.score, kr.description, kr.id)
  }

  static fromInterface(kr: KeyResult) {
    return new KeyResultInMem(kr.score(), kr.description(), kr.id());
  }

  constructor(score: number, description: string, id?: ID) {
    if(id){
      this._id = id;
    } else {
      this._id = getNewId();
    }
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

  setDescription(description: string): void {
    this._description = description;
  }

  description(): string {
    return this._description;
  }

  toStubbed(): KeyResultStubbed {
    return new KeyResultStubbed(this._id, () => this)
  }

  toJSON(): string {
    return JSON.stringify({id: this.id(), description: this.description(), score: this.score()});
  }
}

export default KeyResult;
export {ID, KeyResultStubbed, KeyResultInMem}

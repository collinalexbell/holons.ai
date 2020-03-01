type ID = string

export interface KeyResultObject {
  id: ID;
  score: number;
  description: string;
}

interface KeyResult {
  id(): ID;
  score(): number;
  updateScore(score: number): void;
  description(): string;
}

class EmptyKeyResult implements KeyResult{
  id(): ID {return ""}
  score(): number {return 0}
  updateScore(): void {return}
  description(): string {return ""}
}

type ResolveById = (id: ID) => KeyResult;
class KeyResultStubbed {
  model = "KeyResult";
  _id: ID;
  resolve: ResolveById;
  constructor(id: ID, unstubResolver: ResolveById = (): KeyResult => new EmptyKeyResult()) {
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
      this._id = '';
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

import KeyResultInterface, {ID as KrId} from "../common/KeyResult";
import mongoose, {Schema, Document} from 'mongoose';

interface KeyResultSchema extends Document {id: number; score: number; description: string}
const KeyResultSchema: Schema = new mongoose.Schema({ id: Number, score: Number, description: String});

const KeyResultModel = mongoose.model('KeyResult', KeyResultSchema);

export class KeyResultMongo implements KeyResultInterface {
  kr: KeyResultSchema;
  constructor(kr: KeyResultSchema){
    this.kr = kr;
  }
  id(): KrId {return this.kr._id}
  score(): number {return this.kr.score}
  description(): string {return this.kr.description}
  updateScore(score: number): void {this.kr.score = score}
}

async function get(id: KrId): Promise<KeyResultMongo> {
  const query  = KeyResultModel.findById(id);
  const doc = await query.exec();
  if(doc instanceof KeyResultModel) {
    return Promise.resolve(new KeyResultMongo(doc as KeyResultSchema));
  }
  return Promise.reject()
}

function save(kr: KeyResultInterface): Promise<Document> {
  const doc = {"_id": kr.id(), score: kr.score(), description: kr.description()};
  if(doc._id === "") {
    delete doc._id;
  }
  const krModel = new KeyResultModel(doc);
  return krModel.save()
}

export default {get, save}

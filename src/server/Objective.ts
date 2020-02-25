import Objective, {ID} from "../common/Objective"
import mongoose, {Schema, Document} from 'mongoose';
import KeyResult from "../common/KeyResult";

interface ObjectiveDocument extends Document {description: string}
const ObjectiveSchema: Schema = new mongoose.Schema({description: String});
const ObjectiveModel = mongoose.model('Objective', ObjectiveSchema);

class ObjectiveMongo implements Objective{
  objective: ObjectiveDocument;
  constructor(objective: ObjectiveDocument) {
    this.objective = objective;
  }
  id(): ID {
    return this.objective._id;
  }
  description(): string {
    return this.objective.description
  }
  keyResults(): KeyResult[] {
    return [];
  }

}

function save(objective: Objective): Promise<Document> {
  const doc = {"_id": objective.id(), description: objective.description()};
  if(!doc._id) {
    delete doc._id;
  }
  const objectiveModel = new ObjectiveModel(doc);
  return objectiveModel.save();
}

async function get(id: ID): Promise<ObjectiveMongo> {
  const query = ObjectiveModel.findById(id);
  const doc = await query.exec();
  if(doc instanceof ObjectiveModel) {
    return Promise.resolve(new ObjectiveMongo(doc as ObjectiveDocument));
  }
  return Promise.reject();
}

export default {save, get}

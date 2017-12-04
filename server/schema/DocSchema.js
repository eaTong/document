/**
 * Created by eatong on 17-11-4.
 */
import mongoose, {Schema} from '../mongoConfig';

const DocSchema = new Schema({
  content: {type: String},
  enable: {type: Boolean},
  catalog: {type: String, ref: 'catalog'},
  creator: {type: String, ref: 'user'},
  createTime: {type: Date},
  publishedDoc: {type: String},
  publishHistory: {type: Array,},
  lastPublishUser: {type: String, ref: 'user'},
});

export default mongoose.model('doc', DocSchema);

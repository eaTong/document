/**
 * Created by eatong on 17-11-4.
 */
import mongoose, {Schema} from '../mongoConfig';

const DocSchema = new Schema({
  content: {type: String},
  enable: {type: Boolean},
  catalog: {type: String, ref: 'catalog'}
});

export default mongoose.model('doc', DocSchema);

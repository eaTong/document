/**
 * Created by eatong on 17-11-4.
 */
import mongoose, {Schema} from '../mongoConfig';

const DocSchema = new Schema({
  content: {type: String, required: true},
  enable: {type: Boolean},
});

export default mongoose.model('Doc', DocSchema);

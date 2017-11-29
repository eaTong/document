/**
 * Created by eatong on 17-11-29.
 */
import mongoose, {Schema} from '../mongoConfig';

const ModuleSchema = new Schema({
  name: String,
  remark: String,
  enable: Boolean,
});

export default mongoose.model('module', ModuleSchema);

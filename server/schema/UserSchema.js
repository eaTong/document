/**
 * Created by eatong on 17-11-28.
 */
import mongoose, {Schema} from '../mongoConfig';

const UserSchema = new Schema({
  account: String,
  name: String,
  password: String,
  enable: Boolean,
});

export default mongoose.model('User', UserSchema);

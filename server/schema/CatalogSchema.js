/**
 * Created by eatong on 17-11-30.
 */
import mongoose, {Schema} from '../mongoConfig';

const CatalogSchema = new Schema({
  name: String,
  remark: String,
  enable: Boolean,
});

export default mongoose.model('catalog', CatalogSchema);

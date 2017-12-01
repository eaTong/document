/**
 * Created by eatong on 17-11-30.
 */
import mongoose, {Schema} from '../mongoConfig';

const CatalogSchema = new Schema({
  name: {type: String, required: true},
  comment: {type: String},
  level: {type: Number},
  children: {type: Array, ref: 'catalog'},
  parent: {type: String, ref: 'catalog'},
  module: {type: String, ref: 'module'},
  enable: {type: Boolean},
});

export default mongoose.model('catalog', CatalogSchema);

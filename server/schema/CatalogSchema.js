/**
 * Created by eatong on 17-11-30.
 */
import mongoose, {Schema} from '../mongoConfig';

const CatalogSchema = new Schema({
  name: {type: String, required: true},
  comment: {type: String},
  level: {type: Number},
  thirdPartyKey: {type: String},
  children: {type: Array, ref: this},
  module: {type: String, ref: 'module'},
  hasDoc: {type: Boolean},
  published: {type: Boolean},
  enable: {type: Boolean},
}, {usePushEach: true});

export default mongoose.model('catalog', CatalogSchema);

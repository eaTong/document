/**
 * Created by eatong on 17-11-30.
 */
const {mongoose, Schema} = require('../mongoConfig');

const CatalogSchema = new Schema({
  name: {type: String, required: true},
  comment: {type: String},
  icon: {type: String},
  level: {type: Number},
  sort: {type: Number},
  thirdPartyKey: {type: String},
  children: {type: Array, ref: this},
  module: {type: String, ref: 'module'},
  hasDoc: {type: Boolean},
  published: {type: Boolean},
  enable: {type: Boolean},
}, {usePushEach: true});

module.exports = mongoose.model('catalog', CatalogSchema);

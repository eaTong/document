/**
 * Created by eatong on 17-11-4.
 */
const {mongoose, Schema} = require('../mongoConfig');

const DocSchema = new Schema({
  name: {type: String, required: true},
  icon: {type: String},
  introduction: {type: String},
  level: {type: Number},
  sort: {type: Number},
  thirdPartyKey: {type: String},
  parent: {type: String, ref: this},
  module: {type: String, ref: 'module'},
  published: {type: Boolean},
  content: {type: String},
  viewCount: {type: Number},
  enable: {type: Boolean},
}, {usePushEach: true});

module.exports = mongoose.model('document', DocSchema);

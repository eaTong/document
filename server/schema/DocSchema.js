/**
 * Created by eatong on 17-11-4.
 */
const  {mongoose,Schema} = require('../mongoConfig');

const DocSchema = new Schema({
  content: {type: String},
  enable: {type: Boolean},
  catalog: {type: String, ref: 'catalog'},
  creator: {type: String, ref: 'user'},
  viewCount: {type: Number},
  createTime: {type: Date},
  publishedDoc: {type: String},
  publishHistory: {type: Array,},
  lastPublishUser: {type: String, ref: 'user'},
});

module.exports =mongoose.model('doc', DocSchema);

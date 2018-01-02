/**
 * Created by eatong on 17-11-29.
 */
const  {mongoose,Schema} = require('../mongoConfig');

const ModuleSchema = new Schema({
  name: String,
  remark: String,
  enable: Boolean,
}, {usePushEach: true});

module.exports =mongoose.model('module', ModuleSchema);

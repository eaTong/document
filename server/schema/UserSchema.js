/**
 * Created by eatong on 17-11-28.
 */
const  {mongoose,Schema} = require('../mongoConfig');

const UserSchema = new Schema({
  account: String,
  name: String,
  password: String,
  enable: Boolean,
});

module.exports =mongoose.model('User', UserSchema);

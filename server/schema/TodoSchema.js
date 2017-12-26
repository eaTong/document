/**
 * Created by eatong on 17-11-4.
 */
const  {mongoose,Schema} = require('../mongoConfig');

const TodoSchema = new Schema({
  name: String,
  completed: Boolean
});

module.exports =mongoose.model('Todo', TodoSchema);

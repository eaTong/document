/**
 * Created by eatong on 17-11-4.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('error when connect to mongodb', error);
});
connection.once('open', () => {
  console.log('Success connected to mongodb');
});
const Schema = mongoose.Schema;
export default mongoose;
export {Schema, connection};

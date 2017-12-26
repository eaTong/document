/**
 * Created by eatong on 17-11-4.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/document');
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('error when connect to mongodb', error);
});
connection.once('open', () => {
  console.log('Success connected to mongodb');
});
const Schema = mongoose.Schema;
module.exports = {mongoose, Schema, connection};

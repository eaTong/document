/**
 * Created by eatong on 17-11-4.
 */
const Todo = require('../schema/TodoSchema');

async function findAllTodo() {
  return await Todo.find();
}

async function addTodo(name) {
  const todo = new Todo({name, completed: false});
  return await todo.save();
}

async function toggleTodo(_id) {
  const todo = await Todo.findById(_id);
  todo.completed = !todo.completed;
  await todo.save();
  return todo;
}

module.exports ={
  findAllTodo, addTodo, toggleTodo
}

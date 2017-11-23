/**
 * Created by eatong on 17-10-29.
 */
import React, {Component} from 'react';
import {Page} from '../components';
import Link from 'next/link';
import {inject, observer} from 'mobx-react'
import ajax from '../util/ajaxUtil';


@inject('todo') @observer
class Todo extends Component {

  static async init(ctx) {
    const {data} = await ajax({url: '/api/todo/get', ctx});
    return {todo: {itemList: data}};
  }

  addTodo() {
    const name = this.input.value;
    this.props.todo.addTodo(name);
    this.input.value = '';
  }

  toggleTodo(index) {
    this.props.todo.toggleTodo(index);
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <nav className="breadcrumb" aria-label="todo">
            <ul>
              <li><Link href="/"><a>index</a></Link></li>
              <li className="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
            </ul>
          </nav>
          <div className="title has-text-centered">todo Page</div>
          <div className="content">
            <div className="column">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input className="input" type="text" placeholder="Add a todo" ref={input => this.input = input}/>
                </div>
                <div className="control">
                  <a className="button is-primary" onClick={this.addTodo.bind(this)}>
                    Add todo
                  </a>
                </div>
              </div>
            </div>
          </div>
          {this.props.todo.itemList.map((todo, index) => (
            <a className="media" key={todo._id} onClick={this.toggleTodo.bind(this, index)}>
              <div className="media-content">{todo.name}</div>
              <div className="media-right">
                <div className="level">
                  <span className={`tag is-medium ${todo.completed ? 'is-success' : 'is-warning'}`}>
                    {todo.completed ? 'complted' : 'not completed'}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

Todo.propTypes = {};
export default Page(Todo);

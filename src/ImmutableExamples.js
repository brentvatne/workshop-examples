import React from 'react';
import Immutable from 'immutable';
import { whyDidYouUpdate } from 'why-did-you-update';
// whyDidYouUpdate(React)

const Todo = Immutable.Record({
  id: null,
  title: '',
  complete: false,
  other: null,
});

const TodoList = Immutable.Record({
  name: '',
  todos: Immutable.List(),
});

export default class ImmutableExamples extends React.Component {

  render() {
    return (
      <div>
        <ImmutableExample1 />
        <ImmutableExample2 />
      </div>
    );
  }

}

class ImmutableExample1 extends React.Component {

  render() {
    let todoA = new Todo({id: 1, title: 'Fly to Austria', complete: true});
    let todoB = new Todo({id: 1, title: 'Fly to Austria', complete: true});
    let todoC = todoA.set('title', 'Fly to Austria!');
    let todoD = todoC.set('title', 'Fly to Austria');

    // Immutable.is uses deepEquality check for Immutable types, reference equality check for
    // other primitives

    return (
      <div>
        <p>Immutable.is(todoA, todoB): <strong>{Immutable.is(todoA, todoB) ? 'true' : 'false'}</strong></p>
        <p>todoA === todoB: <strong>{todoA === todoB ? 'true' : 'false'}</strong></p>
        <p>todoA === todoC: <strong>{todoA === todoC ? 'true' : 'false'}</strong></p>
        <p>todoA === todoD: <strong>{todoA === todoC ? 'true' : 'false'}</strong></p>
        <p>Immutable.is(todoA, todoD): <strong>{Immutable.is(todoA, todoD) ? 'true' : 'false'}</strong></p>
      </div>
    );
  }
}

let id = 0;
function createTodo(title) {
  id++;

  return new Todo({
    title,
    id,
  });
}

class ImmutableExample2 extends React.Component {

  state = {
    list: new TodoList({
      name: 'Example 2 List',
      todos: Immutable.List.of(
        createTodo('Make example 2'),
        createTodo('To demonstrate shouldComponentUpdate'),
        createTodo('And other things'),
      )
    })
  }

  _handleClickTodo = (clickedTodo) => {
    let todos = this.state.list.todos.map(todo => {
      if (todo === clickedTodo) {
        return todo.set('complete', !todo.complete);
      } else {
        return todo;
      }
    });

    this.setState({list: this.state.list.set('todos', todos)});
  };

  _handleChangeTitle = ({target: {value}}) => {
    this.setState({
      list: this.state.list.set('name', value),
    });
  };

  render() {
    let { list } = this.state;
    let { todos } = list;

    return (
      <div>
        <input
          type="text"
          onChange={this._handleChangeTitle}
          value={list.name}
          style={styles.listName} />

        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleClick={this._handleClickTodo} />
          ))}
        </ul>
      </div>
    );
  }
}

class TodoItem extends React.Component {

  // Easy to check if it updated or not with just reference equality check!
  // -- disable this, enable whyDidYouUpdate
  shouldComponentUpdate(nextProps) {
    if (nextProps.todo === this.props.todo) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let { todo } = this.props;

    return (
      <li
        style={{textDecoration: todo.complete ? 'line-through' : 'none'}}
        onClick={() => { this.props.handleClick(todo) }}>
        {todo.title}
      </li>
    );
  }
}

const styles = {
  listName: {
    border: 0,
    fontSize: 25,
    fontWeight: 600,
    textDecoration: 'underline',
  },
}

// Exercise: Make a Record class and a simple form for modifying it

// create a component that gets data from the store
// pull it out into a container component

import React from 'react';
import Immutable from 'immutable';

const Todo = Immutable.Record({
  id: null,
  title: '',
  complete: false,
});

const TodoList = Immutable.Record({
  name: '',
  todos: Immutable.List(),
});

export default class ContainerExample extends React.Component {

  render() {
    return (
      <div>
        <TodoListRemoteDataContainer endpoint="todos.json" />
        <TodoListLocalDataContainer />
      </div>
    );
  }
}


class TodoListRemoteDataContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this._loadDataAsync();
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

  async _loadDataAsync() {
    this.setState({isLoading: true});
    try {
      let response = await fetch(this.props.endpoint);
      let data = await response.json();

      let list = new TodoList({
        name: data.name,
        todos: data.todos.map(t => new Todo(t)),
      });

      this.setState({list});
    } catch(e) {
      this.setState({error: e.message});
    } finally {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading!</div>
    } else if (this.state.error) {
      return <div>{this.state.error}</div>
    } else {
      return (
        <TodoListView
          list={this.state.list}
          handleClickTodo={this._handleClickTodo}
          handleChangeTitle={this._handleChangeTitle}
        />
      );
    }
  }
}

class TodoListLocalDataContainer extends React.Component {

  render() {
    let list = new TodoList({
      name: 'This is a local list!',
      todos: Immutable.List.of(new Todo({id: 1, title: '1'}), new Todo({id: 2, title: '2', complete: true}))
    });


    return (
      <TodoListView
        handleClickTodo={() => alert('This list cannot be changed')}
        handleChangeTitle={() => alert('This title cannot be changed')}
        list={list} />
    );
  }
}

class TodoListView extends React.Component {

  static propTypes = {
    list: React.PropTypes.object,
  }

  render() {
    let { list } = this.props;
    let { todos } = list;

    return (
      <div>
        <input
          type="text"
          onChange={this.props.handleChangeTitle}
          value={list.name}
          style={styles.listName} />

        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleClick={this.props.handleClickTodo} />
          ))}
        </ul>
      </div>
    );
  }
}

class TodoItem extends React.Component {

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

// Exercise: Make a "dumb" component for displaying data then provide that data
// in two different ways from container components. Use Immutable

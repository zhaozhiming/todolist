import React, { PropTypes, Component } from 'react';
import TodoInput from './TodoInput';

class Header extends Component {
  handleSave(text) {
    if (text && text.length !== 0) {
      this.props.actions.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Todo List</h1>
        <TodoInput newTodo placeholder="请录入..." onSave={this.handleSave.bind(this)}/>
      </header>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default Header;

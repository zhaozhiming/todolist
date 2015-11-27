import React, { PropTypes, Component } from 'react';
import TodoInput from './TodoInput';

class Header extends Component {
  render() {
    const { actions } = this.props;
    return (
      <header className="header">
        <h1>Todo List</h1>
        <TodoInput newTodo placeholder="请录入..." actions={actions}/>
      </header>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default Header;

import React, { Component, PropTypes } from 'react';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilter';
import classnames from 'classnames';

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed',
};

class Footer extends Component {

  render() {
    const { todos, actions, onShow } = this.props;
    const { clearCompleted } = actions;
    const activeCount = todos.reduce((count, todo) => todo.completed ? count : count + 1, 0);
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{activeCount}</strong> item left</span>
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              <a className={classnames({ selected: filter === this.props.filter })}
                style={{ cursor: 'pointer' }}
                onClick={ () => onShow(filter) }>{FILTER_TITLES[filter]}</a>
            </li>
          )}
        </ul>
        <button className="clear-completed" onClick={ () => clearCompleted() }>Clear completed</button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  onShow: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Footer;

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions/todos';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

class App extends Component {
  render() {
    const { todos, actions, store } = this.props;
    return (
      <div>
        <Header actions={actions}/>
        <TodoList todos={todos} actions={actions}/>
        <div>
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
          </DebugPanel>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {todos: state.todos};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(TodoActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

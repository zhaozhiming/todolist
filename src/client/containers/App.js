import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions/todos';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    const { todos, actions } = this.props;
    return (
      <div>
        <Header actions={actions}/>
        <TodoList todos={todos} actions={actions}/>
        <Footer todos={todos} actions={actions}/>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {todos: state.todos};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(TodoActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

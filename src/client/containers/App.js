import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions/todos';
import Header from '../components/Header';

class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div>
        <Header addTodo={actions.addTodo}/>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {todos: state.todos};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(TodoActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

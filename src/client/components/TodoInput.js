import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TodoInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
    };
  }

  handleSave(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({text: ''});
      }
    }
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value.trim());
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <input className={
        classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo,
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onKeyDown={this.handleSave.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

TodoInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};

export default TodoInput;


import sinon from 'sinon';
import {expect, assert} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoItem from '../../../src/client/components/TodoItem';
import TodoInput from '../../../src/client/components/TodoInput';

function setup(givenTodo) {
  const actions = {
    deleteTodo: sinon.spy(),
    updateTodo: sinon.spy(),
    completeTodo: sinon.spy(),
  };

  const props = {
    todo: Object.assign({}, givenTodo),
    actions: actions,
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<TodoItem {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer,
  };
}

function doubleClick() {
  const { output, renderer, props } = setup({id: 0, completed: false, text: 'foo'});
  const div = output.props.children;
  const label = div.props.children[1];
  label.props.onDoubleClick();
  return {props, renderer, output};
}

function verifySaveTodo(saveText) {
  const { renderer, props } = doubleClick();
  const update = renderer.getRenderOutput();
  const todoInput = update.props.children;
  todoInput.props.onSave(saveText);
  return {props, renderer, update};
}

describe('components', () => {
  describe('TodoItem', () => {
    it('should render correctly when no editting', () => {
      const { output } = setup({completed: true, text: 'foo'});
      expect(output.type).to.be.equal('li');
      expect(output.props.className).to.be.equal('completed');

      const div = output.props.children;
      expect(div.type).to.be.equal('div');
      expect(div.props.className).to.be.equal('view');

      const [ input, label, button ] = div.props.children;
      expect(input.type).to.be.equal('input');
      expect(input.props.className).to.be.equal('toggle');
      expect(input.props.type).to.be.equal('checkbox');
      expect(input.props.checked).to.be.equal(true);

      expect(label.type).to.be.equal('label');
      expect(label.props.children).to.be.equal('foo');

      expect(button.type).to.be.equal('button');
      expect(button.props.className).to.be.equal('destroy');
    });

    it('should classname have not complete when todo complete is false', () => {
      const { output } = setup({completed: false, text: 'foo'});
      expect(output.props.className).to.be.equal('');
    });

    it('should render correctly when editting', () => {
      const { output, renderer } = doubleClick();
      const div = output.props.children;
      const label = div.props.children[1];
      label.props.onDoubleClick();

      const update = renderer.getRenderOutput();
      expect(update.props.className).to.be.equal('editing');
      const todoInput = update.props.children;
      expect(todoInput.type).to.be.equal(TodoInput);
      expect(todoInput.props.editing).to.be.equal(true);
      expect(todoInput.props.placeholder).to.be.equal('请录入...');
      expect(todoInput.props.text).to.be.equal('foo');
    });

    it('should delete todo when editting text is empty', () => {
      const result = verifySaveTodo('');
      const {renderer, props} = result;
      let update = result.update;
      assert(props.actions.deleteTodo.calledWith(0));
      update = renderer.getRenderOutput();
      expect(update.props.className).to.be.equal('');
    });

    it('should update todo when editting text change', () => {
      const {props} = verifySaveTodo('bar');
      assert(props.actions.updateTodo.calledWith(0, 'bar'));
    });

    it('should complete todo when checkbox click', () => {
      const { output, props } = setup({id: 0, completed: false, text: 'foo'});
      const div = output.props.children;
      const input = div.props.children[0];
      input.props.onChange();
      assert(props.actions.completeTodo.calledWith(0));
    });

    it('should delete todo when button click', () => {
      const { output, props } = setup({id: 0, completed: false, text: 'foo'});
      const div = output.props.children;
      const button = div.props.children[2];
      button.props.onClick();
      assert(props.actions.deleteTodo.calledWith(0));
    });
  });
});

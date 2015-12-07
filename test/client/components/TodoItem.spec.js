import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoItem from '../../../src/client/components/TodoItem';
import TodoInput from '../../../src/client/components/TodoInput';

function setup(givenTodo) {
  const actions = {
    deleteTodo: expect.createSpy(),
    updateTodo: expect.createSpy(),
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

function verifySaveTodo(saveText) {
  const { output, renderer, props } = setup({id: 0, completed: false, text: 'foo'});
  const div = output.props.children;
  const label = div.props.children[1];
  label.props.onDoubleClick();

  const update = renderer.getRenderOutput();
  const todoInput = update.props.children;
  todoInput.props.onSave(saveText);
  return {props, renderer, update};
}

describe('components', () => {
  describe('TodoItem', () => {
    it('should render correctly when no editting', () => {
      const { output } = setup({completed: true, text: 'foo'});
      expect(output.type).toBe('li');
      expect(output.props.className).toBe('completed');

      const div = output.props.children;
      expect(div.type).toBe('div');
      expect(div.props.className).toBe('view');

      const [ input, label, button ] = div.props.children;
      expect(input.type).toBe('input');
      expect(input.props.className).toBe('toggle');
      expect(input.props.type).toBe('checkbox');
      expect(input.props.checked).toBe(true);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('foo');

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('destroy');
    });

    it('should render correctly when editting', () => {
      const { output, renderer } = setup({completed: false, text: 'foo'});
      expect(output.props.className).toBe('');

      const div = output.props.children;
      const label = div.props.children[1];
      label.props.onDoubleClick();

      const update = renderer.getRenderOutput();
      expect(update.props.className).toBe('editing');
      const todoInput = update.props.children;
      expect(todoInput.type).toBe(TodoInput);
      expect(todoInput.props.editing).toBe(true);
      expect(todoInput.props.placeholder).toBe('请录入...');
      expect(todoInput.props.text).toBe('foo');
    });

    it('should delete todo when editting text is empty', () => {
      const result = verifySaveTodo('');
      const {renderer, props} = result;
      let update = result.update;
      expect(props.actions.deleteTodo).toHaveBeenCalledWith(0);
      update = renderer.getRenderOutput();
      expect(update.props.className).toBe('');
    });

    it('should update todo when editting text change', () => {
      const {props} = verifySaveTodo('bar');
      expect(props.actions.updateTodo).toHaveBeenCalledWith(0, 'bar');
    });
  });
});

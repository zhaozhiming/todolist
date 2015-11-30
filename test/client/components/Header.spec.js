import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../../../src/client/components/Header';
import TodoInput from '../../../src/client/components/TodoInput';

function setup() {
  const actions = {
    addTodo: expect.createSpy(),
  };

  const props = {
    actions: actions,
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer,
  };
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('header');
      expect(output.props.className).toBe('header');

      const [ h1, input ] = output.props.children;

      expect(h1.type).toBe('h1');
      expect(h1.props.children).toBe('Todo List');

      expect(input.type).toBe(TodoInput);
      expect(input.props.newTodo).toBe(true);
      expect(input.props.placeholder).toBe('请录入...');
    });

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('');
      expect(props.actions.addTodo.calls.length).toBe(0);
      input.props.onSave('Use Redux');
      expect(props.actions.addTodo.calls.length).toBe(1);
    });
  });
});

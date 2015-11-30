import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoInput from '../../../src/client/components/TodoInput';

function setup() {
  const props = {
    text: 'foo',
    placeholder: 'please input',
    editing: false,
    newTodo: true,
    onSave: expect.createSpy(),
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<TodoInput {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer,
  };
}

describe('components', () => {
  describe('TodoInput', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('input');
      expect(output.props.className).toBe('new-todo');
      expect(output.props.value).toBe('foo');
      expect(output.props.placeholder).toBe('please input');
    });

    it('should set state text when call onChange', () => {
      const { output, renderer } = setup();

      output.props.onChange({target: {value: 'bar'}});
      const update = renderer.getRenderOutput();
      expect(update.props.value).toBe('bar');
    });
  });
});

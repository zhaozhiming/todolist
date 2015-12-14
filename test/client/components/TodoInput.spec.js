import spy from 'expect';
import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoInput from '../../../src/client/components/TodoInput';

function setup(givenProps = {}) {
  const props = Object.assign({
    text: 'foo',
    placeholder: 'please input',
    editing: false,
    newTodo: true,
    onSave: spy.createSpy(),
  }, givenProps);

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
    it('should render correctly when new todo', () => {
      const { output } = setup();
      expect(output.type).to.be.equal('input');
      expect(output.props.className).to.be.equal('new-todo');
      expect(output.props.value).to.be.equal('foo');
      expect(output.props.placeholder).to.be.equal('please input');
    });

    it('should render correctly when editing', () => {
      const { output } = setup({editing: true, newTodo: false});
      expect(output.props.className).to.be.equal('edit');
    });
    it('should set state text when call onChange', () => {
      const { output, renderer } = setup();
      output.props.onChange({target: {value: 'bar'}});
      const update = renderer.getRenderOutput();
      expect(update.props.value).to.be.equal('bar');
    });

    it('should save todo when call onKeyDown enter', () => {
      const { output, props } = setup();
      output.props.onKeyDown({target: {value: 'bar'}, which: 13});
      spy(props.onSave).toHaveBeenCalledWith('bar');
    });

    it('should save todo when call onBlur', () => {
      const { output, props } = setup({newTodo: false });
      output.props.onBlur({target: {value: 'bar'}});
      spy(props.onSave).toHaveBeenCalledWith('bar');
    });
  });
});

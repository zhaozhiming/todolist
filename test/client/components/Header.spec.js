import spy from 'expect';
import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../../../src/client/components/Header';
import TodoInput from '../../../src/client/components/TodoInput';

function setup() {
  const actions = {
    addTodo: spy.createSpy(),
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

      expect(output.type).to.be.equal('header');
      expect(output.props.className).to.be.equal('header');

      const [ h1, input ] = output.props.children;

      expect(h1.type).to.be.equal('h1');
      expect(h1.props.children).to.be.equal('Todo List');

      expect(input.type).to.be.equal(TodoInput);
      expect(input.props.newTodo).to.be.equal(true);
      expect(input.props.placeholder).to.be.equal('请录入...');
    });

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('');
      expect(props.actions.addTodo.calls.length).to.be.equal(0);
      input.props.onSave('Use Redux');
      expect(props.actions.addTodo.calls.length).to.be.equal(1);
    });
  });
});

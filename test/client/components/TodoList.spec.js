import sinon from 'sinon';
import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoList from '../../../src/client/components/TodoList';
import TodoItem from '../../../src/client/components/TodoItem';
import Footer from '../../../src/client/components/Footer';
import {SHOW_ACTIVE, SHOW_COMPLETED} from '../../../src/client/constants/TodoFilter';

function setup(todos) {
  const actions = {
    completeAll: sinon.spy(),
  };

  const props = {
    todos: todos,
    actions: actions,
  };
  const renderer = TestUtils.createRenderer();
  renderer.render(<TodoList {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer,
  };
}

function verifyFilter(givenTodos, filter, expectCount) {
  const {output, renderer} = setup(givenTodos);
  const footer = output.props.children[2];
  footer.props.onShow(filter);
  const update = renderer.getRenderOutput();
  const todos = update.props.children[1].props.children;
  expect(todos.length).to.be.equal(expectCount);
}

describe('components', () => {
  describe('TodoList', () => {
    it('should render correctly', () => {
      const {output} = setup([{id: 0, completed: true}]);
      expect(output.type).to.be.equal('section');
      expect(output.props.className).to.be.equal('main');

      const [input, ul, footer] = output.props.children;
      expect(input.type).to.be.equal('input');
      expect(input.props.className).to.be.equal('toggle-all');
      expect(input.props.type).to.be.equal('checkbox');
      expect(ul.type).to.be.equal('ul');
      expect(ul.props.className).to.be.equal('todo-list');
      expect(footer.type).to.be.equal(Footer);

      const todos = ul.props.children;
      expect(todos.length).to.be.equal(1);
      expect(todos[0].type).to.be.equal(TodoItem);
      expect(todos[0].key).to.be.equal('0');
      expect(todos[0].props.todo.completed).to.be.equal(true);
    });

    it('should render correctly when filter completed', () => {
      verifyFilter([{id: 0, completed: true}], SHOW_ACTIVE, 0);
    });

    it('should render correctly when filter active', () => {
      verifyFilter([{id: 0, completed: false}], SHOW_COMPLETED, 0);
    });
  });
});

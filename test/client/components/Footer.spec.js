import expect from 'expect';
import React from 'react' ;
import TestUtils from 'react-addons-test-utils';
import Footer from '../../../src/client/components/Footer';
import {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} from '../../../src/client/constants/TodoFilter';
import classnames from 'classnames';

const FILTER_TITLES = [
  {key: SHOW_ALL, desc: 'All'},
  {key: SHOW_ACTIVE, desc: 'Active'},
  {key: SHOW_COMPLETED, desc: 'Completed'},
];

function setup(todos, filter) {
  const actions = {
    clearCompleted: expect.createSpy(),
  };

  const props = {
    todos: todos,
    actions: actions,
    onShow: expect.createSpy(),
    filter: filter,
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Footer {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    renderer: renderer,
    output: output,
  };
}

function verifyTab(filter, index) {
  const {output } = setup([{completed: false}], filter);
  const ul = output.props.children[1];
  const active = ul.props.children[index];
  expect(active.props.children.props.className).toBe('selected');
}

describe('Component', () => {
  describe('Footer', () => {
    it('should render correctly', () => {
      const {output, props} = setup([{completed: false}, {completed: true}], SHOW_ALL);
      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('footer');
      const [span, ul, button] = output.props.children;
      expect(span.type).toBe('span');
      expect(span.props.className).toBe('todo-count');
      const [strong, text] = span.props.children;
      expect(strong.type).toBe('strong');
      expect(`${strong.props.children}${text}`).toBe('1 item left');

      expect(ul.type).toBe('ul');
      expect(ul.props.className).toBe('filters');

      ul.props.children.forEach((li, index) => {
        expect(li.type).toBe('li');
        expect(li.key).toBe(FILTER_TITLES[index].key);
        const a = li.props.children;
        expect(a.type).toBe('a');
        expect(a.props.className).toBe(classnames({selected: li.key === props.filter}));
        expect(a.props.children).toBe(FILTER_TITLES[index].desc);
      });

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('clear-completed');
      expect(button.props.children).toBe('Clear completed');
    });

    it('should have not button when only active todo', () => {
      const {output } = setup([{completed: false}], SHOW_ALL);
      const button = output.props.children[2];
      expect(button).toBe(undefined);
    });

    it('should show correct tab when given special filter', () => {
      verifyTab(SHOW_ALL, 0);
      verifyTab(SHOW_ACTIVE, 1);
      verifyTab(SHOW_COMPLETED, 2);
    });

    it('should clear complete when click button', () => {
      const {output, props } = setup([{completed: true}], SHOW_ALL);
      const button = output.props.children[2];
      button.props.onClick();
      expect(props.actions.clearCompleted).toHaveBeenCalledWith();
    });

    it('should switch filter when href link click', () => {
      const {output, props } = setup([], SHOW_ALL);
      const ul = output.props.children[1];
      const li = ul.props.children[0];
      li.props.children.props.onClick();
      expect(props.onShow).toHaveBeenCalledWith(SHOW_ALL);
    });
  });
});

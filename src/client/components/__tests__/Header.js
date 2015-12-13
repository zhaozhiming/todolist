jest.dontMock('../Header');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// import Header from '../Header';

describe('Header', () => {
  it('should render correctly', () => {
    const header = TestUtils.renderIntoDocument(<header />);
    console.log(header);
  });
});

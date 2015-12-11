jest.donMock('../Header');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
const Header = require('../Header');

describe('Header', () => {
  it('should render correctly', () => {
    const header = TestUtils.renderIntoDocument(<Header />);
    console.log(header);
  });
});

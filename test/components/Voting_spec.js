import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import {expect} from 'chai';

import Voting from '../../src/components/Voting';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={['first', 'second']} />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('first');
    expect(buttons[1].textContent).to.equal('second');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const voteHanlder = entry => votedWith = entry;

    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={['first', 'second']} vote={voteHanlder} />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    ReactTestUtils.Simulate.click(buttons[0]);

    expect(votedWith).to.equal('first');
  })
});

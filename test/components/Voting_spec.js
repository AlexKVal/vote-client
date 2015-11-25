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

  it('disables buttons when user has voted', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={['f', 's']} hasVoted="f" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  })

  it('adds label to the voted entry', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={['f', 's']} hasVoted='f' />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  })

  it('renders just the winner when there is one', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting winner="Trainspotting" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = React.findDOMNode( component.refs.winner );
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  })
});

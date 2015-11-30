import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import {List} from 'immutable';
import {expect} from 'chai';

import {render} from '../helpers';

import {Voting} from '../../src/components/Voting';

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

    const winner = ReactDOM.findDOMNode( component.refs.winner );
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  })

  // use benefits of immutability
  it('renders as a pure component', () => {
    const pair = ['first', 'second'];
    let component = render(<Voting pair={pair} />);

    let firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('first');

    pair[0] = 'Third';
    // component.setProps({pair});
    component = component.renderWithProps({pair});
    firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('first');
  })

  it('does update DOM when prop changes', () => {
    const pair = List.of('first', 'second');
    let component = render(<Voting pair={pair} />);

    let firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('first');

    const newPair = pair.set(0, 'Third');
    // component.setProps({pair: newPair});
    component = component.renderWithProps({pair: newPair});
    firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Third');
  })
});

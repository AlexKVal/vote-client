import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import {List, Map} from 'immutable';
import {expect} from 'chai';

import Results from '../../src/components/Results';

describe('Results', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = List.of('first', 'second');
    const tally = Map({'first': 5});
    const component = ReactTestUtils.renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'entry');
    const [first, second] = entries.map( e => e.textContent );

    expect(entries.length).to.equal(2);
    expect(first).to.contain('first');
    expect(first).to.contain('5');
    expect(second).to.contain('second');
    expect(second).to.contain('0');
  })

  it('invokes the next callback when next button is clicked', (done) => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = ReactTestUtils.renderIntoDocument(
      <Results
        pair={pair}
        tally={Map()}
        next={() => done()}
      />
    );
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.next));
  })

  it('renders the winner when there is one', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Results
        winner="Trainspotting"
        pair={["Trainspotting", "28 Days Later"]}
        tally={Map()}
      />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  })
})

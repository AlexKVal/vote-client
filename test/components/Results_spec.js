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

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Trainspotting', '28 Days Later');
    const component = ReactTestUtils.renderIntoDocument(
      <Results
        pair={pair}
        tally={Map()}
        next={next}
      />
    );
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  })
})

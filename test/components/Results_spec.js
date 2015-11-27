import React from 'react';
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
})

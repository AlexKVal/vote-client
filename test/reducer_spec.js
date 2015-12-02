import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  // the first action
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('first', 'second'),
          tally: Map({first: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['first', 'second'],
        tally: {first: 1}
      }
    }))
  })

  // just for demonstration purpose
  if('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('first', 'second'),
          tally: Map({first: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['first', 'second'],
        tally: {first: 1}
      }
    }))
  })

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('first', 'second'),
          tally: Map({first: 1})
        })
      })
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['first', 'second'],
        tally: {first: 1}
      }
    }))
  })

  // the second action
  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    }));
  })

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['first', 'second'],
        tally: {first: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'another'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['first', 'second'],
        tally: {first: 1}
      }
    }));
  })
})

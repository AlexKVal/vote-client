import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['First thing', 'Second thing'];

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);

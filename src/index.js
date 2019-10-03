import React from 'react';
import ReactDOM from 'react-dom';

import { Bloc, BlocContext } from './bloc/todos/bloc'; // BlocContext
import App from './components/App';

ReactDOM.render(
  (
    <BlocContext.Provider value={new Bloc()}>
      <App />
    </BlocContext.Provider>
  ),
  document.querySelector('#root')
);

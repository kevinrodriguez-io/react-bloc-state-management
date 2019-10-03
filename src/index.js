import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import { Bloc } from './bloc/todos/bloc'; // BlocContext
import App from './components/App';

export const BlocContext = createContext();

ReactDOM.render(
  (
    <BlocContext.Provider value={new Bloc()}>
      <App />
    </BlocContext.Provider>
  ),
  document.querySelector('#root')
);

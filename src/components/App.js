import React, { useContext, useMemo } from 'react';
import { BlocContext } from '../bloc/todos/bloc';
import { Load } from '../bloc/todos/event';
import { useSubscription } from 'use-subscription';
import { Initial, Loading, Loaded } from '../bloc/todos/state';

function App() {
  const bloc = useContext(BlocContext);
  
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => bloc.observable.value,
      subscribe: callback => {
        const subscription = bloc.observable.subscribe(callback);
        return () => { subscription.unsubscribe(); };
      }
    }),
    [bloc.observable]
  );
  
  const value = useSubscription(subscription);

  const handleLoadTodosClick = () => {
    bloc.dispatch(new Load());
  };

  return (
    <>
      <button onClick={handleLoadTodosClick}>Load Todos</button>
      { value instanceof Initial && (
        <div>
          Initial State
        </div>
      )}
      { value instanceof Loading && (
        <div>
          Loading
        </div>
      )}
      { value instanceof Loaded && (
        <pre>
          {JSON.stringify(value.todos, null, 2)}
        </pre>
      )}
    </>
  );
}

export default App;

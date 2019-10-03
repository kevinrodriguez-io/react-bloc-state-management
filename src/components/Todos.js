import React, { useContext, useMemo } from 'react';
import { BlocContext } from '../bloc/todos/bloc';
import { Load } from '../bloc/todos/event';
import { useSubscription } from 'use-subscription';
import { Initial, Loading, Loaded } from '../bloc/todos/state';

function Todos() {
  const todosBloc = useContext(BlocContext);
  
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => todosBloc.observable.value,
      subscribe: callback => {
        const subscription = todosBloc.observable.subscribe(callback);
        return () => { subscription.unsubscribe(); };
      }
    }),
    [todosBloc.observable]
  );
  const todosState = useSubscription(subscription);

  const handleLoadTodosClick = () => {
    todosBloc.dispatch(new Load());
  };

  return (
    <>
      <button onClick={handleLoadTodosClick}>Load Todos</button>
      { todosState instanceof Initial && (
        <div>
          Initial State
        </div>
      )}
      { todosState instanceof Loading && (
        <div>
          Loading
        </div>
      )}
      { todosState instanceof Loaded && (
        <pre>
          {JSON.stringify(todosState.todos, null, 2)}
        </pre>
      )}
    </>
  );
}

export default Todos;

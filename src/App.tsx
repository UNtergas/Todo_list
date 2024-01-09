import React from 'react';
import { AppContainer } from './styles';
import { Column, Card, AddNewItem } from './components';
import { useAppState } from './hooks';


const App = () => {
  const { state, dispatch } = useAppState()

  return (
    <AppContainer>
      {state.lists.map((list, i) => {
        // if (list.id === state.draggedItem?.id) {
        //   return <Column id={list.id} text={list.text} key={list.id} index={i} isDragged />
        // }
        return <Column id={list.id} text={list.text} key={list.id} index={i} />
      })}
      <AddNewItem toggleButtonText='+ Add new list'
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
    </AppContainer>
  );
}

export default App;

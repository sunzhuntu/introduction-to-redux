//import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

const Button = ({eventHandler, text}) => {
  return <button onClick={eventHandler}> {text} </button>
}

const counterReducer = (state=0, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1;
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)
//console.log("the initial state is:", store.getState())

store.subscribe(() => {
  const storeNow = store.getState()
  console.log("the current state is:", storeNow)

})

store.dispatch({type: 'INCREASE'})
store.dispatch({type: 'INCREASE'})
store.dispatch({type: 'INCREASE'})
//console.log("the first updated state is:", store.getState())

store.dispatch({type: 'DECREASE'})
//console.log("the second updated state is:", store.getState())


store.dispatch({type: 'ZERO'})
//console.log("the last updated state is:", store.getState())


const App = () => {
  
  return(
    <div className="App">
      <h3> Change the Number of Likes</h3>
      <p>The number of likes is: {store.getState}</p>
      <Button text='increase' eventHandler={() => store.dispatch({type: 'INCREASE'})}/>
      <Button text='decrease' eventHandler={() => store.dispatch({type: 'DECREASE'})}/>
      <Button text='reset' eventHandler={() => store.dispatch({type: 'ZERO'})}/>
    </div>
  )
}

export default App;

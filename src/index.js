import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
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

const App = () => {
  
  return(
    <div className="App">
      <h3> Change the Number of Likes</h3>
      <p>The number of likes is: {store.getState()}</p>
      <Button text='increase' eventHandler={() => store.dispatch({type: 'INCREASE'})}/>
      <Button text='decrease' eventHandler={() => store.dispatch({type: 'DECREASE'})}/>
      <Button text='reset' eventHandler={() => store.dispatch({type: 'ZERO'})}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

renderApp()
store.subscribe(renderApp)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

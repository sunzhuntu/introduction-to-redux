import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';



const productReducer = (state=[], action) => {
  switch (action.type) {
    case 'NEW_PRODUCT':
      return [...state, action.data]
    case 'TOGGLE_AVAILABILITY': {
      const id = action.data.id
      const productToChange = state.find(p => p.id === id)
      const changedProduct = {
        ...productToChange,
        availability: !productToChange.availability
      }
      return state.map(product => 
        product.id !== id ? product : changedProduct
      )
    }
    default:
      return state
  }
}

const store = createStore(productReducer)
//console.log("the initial state is:", store.getState())

store.dispatch({
  type: 'NEW_PRODUCT',
  data: {
    title: 'Dell Laptop',
    category: 'Electronics',
    availability: Math.random > 0.5,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_PRODUCT',
  data: {
    title: 'Web Design',
    category: 'Book',
    availability: false,
    id: 2
  }
})

store.dispatch({
  type: 'TOGGLE_AVAILABILITY',
  data: {
    id: 2
  }
})

store.subscribe(() => {
  const storeNow = store.getState()
  console.log("the current state is:", storeNow)
})

const App = () => {
  
  return(
    <div className="App">
      <h3> The List of Products</h3>
      <ul>
        {store.getState().map(product => 
          <li key={product.id}>
            {product.title} -- {product.category} -- 
            <strong>{product.availability? "available" : "sold out"}</strong>
          </li>
        )}
      </ul>
      
    </div>
  )
}

// const renderApp = () => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// }

// renderApp()
// store.subscribe(renderApp)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

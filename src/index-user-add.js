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

const generateId = () => Math.floor(Math.random() * 1000000)

const createProduct = (title, category) => {
  return {
    type: 'NEW_PRODUCT',
      data: {
        title: title,
        category: category,
        availability: Math.random > 0.5,
        id: generateId()
      }
  }
}

const ToggleAvailabilityOf = (id) => {
  return {
    type: 'TOGGLE_AVAILABILITY',
    data: {id}
  }
}

const App = () => {
  const addProduct = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const category = event.target.category.value
    event.target.title.value = ''
    event.target.category.value = ''
    store.dispatch(createProduct(title, category))
  }

  const ToggleAvailability = (id) => {
    store.dispatch(ToggleAvailabilityOf(id))
  }  

  return(
    <div className="App">
      <h3> Add New Products</h3>
      <form onSubmit={addProduct}>
        <input name='title' />
        <input name='category'/>
        <button type='submit'> add </button>
      </form>

      <h3> The List of Products</h3>
      <ul>
        {store.getState().map(product => 
          <li key={product.id}>
            {product.title} -- {product.category} -- 
            <button onClick={() => ToggleAvailability(product.id)}>
              {product.availability? "available" : "sold out"}
            </button>
          </li>
        )}
      </ul>
      
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

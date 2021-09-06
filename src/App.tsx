import React from 'react';
import './App.css';
import Cart from "./Cart";
import store from "./store";
import {Provider} from "react-redux";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Cart/>
          </div>
      </Provider>
  );
}

export default App;

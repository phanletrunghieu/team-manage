import React, { Component } from 'react';
import { Provider } from 'react-redux';
import myStore from "./myStore";
import Root from "./router";
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <Root />
      </Provider>
    );
  }
}

export default App;

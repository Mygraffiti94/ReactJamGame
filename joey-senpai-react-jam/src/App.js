import './App.css';
import Menu from './components/misc/menu';
import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React with senpai
        </a>
      </header> */}
      <Board />
    </div>
  );
}

export default App;

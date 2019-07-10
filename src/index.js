import React from "react";
import ReactDOM from "react-dom";
import { interval } from "rxjs";
import "./register";
import "./styles.css";

const counter = interval(1000);

function App() {
  return (
    <React.Suspense fallback={<h1>Loading</h1>}>
      <div className="App">
        <h2>Count {counter}</h2>
      </div>
    </React.Suspense>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import React from "react";
import { interval } from "rxjs";

const counter = interval(1000);

export default function App() {
  return (
    <React.Suspense fallback={<h1>Loading</h1>}>
      <div className="App">
        <h2>Count {counter}</h2>
      </div>
    </React.Suspense>
  );
}

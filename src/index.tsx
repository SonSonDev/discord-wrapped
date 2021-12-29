import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Wrapped from "./Wrapped";
import reportWebVitals from "./reportWebVitals";

let Component = App;
// https://blog.logrocket.com/multiple-entry-points-in-create-react-app-without-ejecting/
if (process.env.REACT_APP_TARGET === "wrapped") {
  Component = Wrapped;
}

ReactDOM.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

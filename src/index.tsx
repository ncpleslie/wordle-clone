import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

// // resize for scaling the board size
window.addEventListener("resize", onResize, false);
// set size on startup
onResize();

function onResize() {
  // get actual vh on mobile
  document.body.style.setProperty("--vh", window.innerHeight + "px");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

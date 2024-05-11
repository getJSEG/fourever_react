import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import App from "./src/app.js";

import './src/static/css/main.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( 
    <React.StrictMode> 
        <App />
    </React.StrictMode> 
);


// repost web vitals
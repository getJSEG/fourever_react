import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app.js";
import './static/css/main.css';

import { store } from "./app/store.js";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( 
    <React.StrictMode> 
        <Provider store={store}> 
            <BrowserRouter>
                <Routes> 
                    <Route path="/*" element={  <App /> }/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode> 
);

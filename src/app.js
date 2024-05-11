import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Links } from "react-router-dom";
import './static/css/main.css';

//Routes
import Login from "./pages/Login";
import Dashboard from "./pages/Dashoard"
import POSsystem from "./pages/POSsystem"; 
import Inventory from "./pages/Inventory";
import Menu from "./pages/Menu";
import LocationSettings from "./pages/LocationSettings";
import Varients from "./pages/Varients";
import BarcodeGenerator from "./components/BarcodeGenerator";

import PrivateRoute from "./hocs/PrivateRoute";

//redux
import  { Provider } from 'react-redux';
import store from './store';


export default class App extends Component {

    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route element={ <PrivateRoute /> } > 
                            <Route exact path='/dashboard' element={ <Dashboard /> } /> 
                            <Route exact path='/inventory' element={ <Inventory /> } /> 
                            <Route exact path='/product/:id/varients' element={<Varients /> } />
                            <Route exact path='/product/:id/varients/:varientId' element={<Varients /> } />
                            <Route exact path='/pos' element={ <POSsystem /> } /> 
                            <Route exact path="/menu" element={<Menu /> } />
                            <Route exact path="/location-settings" element={<LocationSettings /> } />
                            {/* <Route exact path="/" element={<BarcodeGenerator /> } /> */}
                        </Route>
                    
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </Provider>
        )
    }
}

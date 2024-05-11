import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

//Style css
import '../static/css/components/Loading.css'

//static file
import logo from '../static/images/loading.gif'


const Loading = ({}) => {

    // const [GIF, setGIF] = useState();
    
    const loading = (
        <div className="loading-img-container">
            <img src={logo} />
        </div>
    );

    return(
        <div className="loading-page">
            {loading}
        </div>
    );
}



export default connect() (Loading);
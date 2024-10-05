import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

// Style
import "../static/css/components/alertMessage.css"

const AlertMessage  = ({ message, isSuccess }) => {

    return(
        <div className={`alert ${ isSuccess ? 'success' : 'error'}` }>
            <p className="alert-text">  {message}</p>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(AlertMessage);
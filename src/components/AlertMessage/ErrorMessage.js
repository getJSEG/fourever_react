import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

import Message from "./Message";

const ErrorMessage  = ({ message, errorMessageHandler }) => {
        
    return(
        <div>
            <Message
                message={ message }
                color={ "red" }
                messageHandler = { errorMessageHandler }
            />
            
        </div>
    )
}


export default ErrorMessage;
import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

import Message from "./Message";

const SuccessMessage  = ({ message, successMesageHandler }) => {
        
    return(
        <div>
            <Message
                message={ message }
                color={ "green" }
                messageHandler = { successMesageHandler }
            />
        </div>
    )
}


export default SuccessMessage;
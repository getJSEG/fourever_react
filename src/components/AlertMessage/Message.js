import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

// Style
import "../../static/css/components/alertMessage.css"

const Message  = ({ message, color, messageHandler }) => {

    // // clear mesage and is visible
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                // clearing every item
                messageHandler('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    // unmounting
    useEffect(() => {
        return () => { }
    }, []);
        
    return(
        <div className="banner">
            <div className={`${color === "red" ? "error-alert-msg " : "success-alert-msg" } alert-msg`}>
                <div className="msg-container">
                    <span className="alert-msg-icon">
                        {
                            color == "red" 
                            ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                            </svg>
                        }
                    </span>
                    <p className="alert-text"> { message || '' }  </p>
                </div>
            </div>
        </div>
    )
}

export default Message;
import React, { useState, useEffect, useRef }from "react";
import { useLocation, NavLink, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductDetailSetting  = ({handleCloseWindow}) => {

    const settingsWindowRef = useRef(null);

    const handleClickOutside = (event) => {
        if (settingsWindowRef.current && !settingsWindowRef.current.contains(event.target)) {
            handleCloseWindow(false);
        }
    }
    // Event Listener
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return(
        <div ref={settingsWindowRef} className="product-setting">

            <div className="delt-btn-container">
                <button onClick={ () => handleCloseWindow(true) } className="delt-button">
                    <div className="btn-icn-cntainer"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" className="bi bi-trash4" viewBox="0 0 20 18">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </div>
                    <div className="delt-button-wrd-ctnr">
                        <p className="delt-button-wrd"> Borrar </p>
                    </div>
                </button>
            </div>

        </div>
    )
}


export default ProductDetailSetting;
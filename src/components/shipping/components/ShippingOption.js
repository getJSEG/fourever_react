import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';


const ShippingOption  = ({handleShippingOption}) => {

    const navigate = useNavigate();

    // handle Type of Shipping
    const shippingTypeHandler = (shippingType) => {
        navigate('/shipping/create', { state: {shippingType: shippingType}});
    }


    return (
        <div className="main-container">  
            <p className="page-title"> Opciones de Envios </p>
            <div className="background-container mt4 pdl0 pdr0 pb1">
               <div className="create-product-fields">
                    <button  onClick= {() => shippingTypeHandler("parcel") } className="shipng-option-btn rounded-lg pointer remove-underline"> 
                        ENCOMIENDAS
                    </button>

                    <button onClick={ () => shippingTypeHandler("personalShipping")  } className="shipng-option-btn rounded-lg pointer remove-underline"> 
                        PERSONALIZADOS
                    </button>
                </div>
            </div>

            <div className="rounded-lg pointer create-btn pt10 mt1 remove-underline" 
                  onClick={() => handleShippingOption(false) }> 
                      Regresar 
            </div>

      </div>  
    );
}

export default ShippingOption;
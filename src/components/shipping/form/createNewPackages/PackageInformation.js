import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';


const PackageInformation  = ({handleStepOne, handleStepTwo, shippingDetailHandler, paymentMethodHandler, shippingDetails, paymentType, totalItemInPackage}) => {
    
    // acceptable payment types
    //  {"credit_card": "Targeta"}
    const [transactionType, setTransactionType] = useState([{"cash":"Efectivo"},{"bank_transfer": "Transferencia"}])
    
    return (
    <div > 
        <div className="background-container mt3 shipping-inputs-container">
            <p className="pdb1"> Informacion de envio </p>
            <div className="p-05 shipping-inputs-wrapper">
                <div className="pdr1 width-10">
                    <label htmlFor="details"> Observaciones </label>
                </div>
                <div className="width-50">
                    <textarea
                        className="form-inputs p1 width-100 rounded-lg"
                        id="details"
                        name="details"
                        placeholder="Observaciones"
                        type="text" 
                        autoComplete="off"
                        onChange={e => shippingDetailHandler(e)}
                        value={shippingDetails?.details}></textarea>
                </div>
            </div>

            <div className="p-05 shipping-inputs-wrapper">
                <div className="pdr1 width-10">
                    <label > Bultos </label>
                </div>
                <div className="width-50">
                    <p className="p1 width-100 rounded-lg"> { totalItemInPackage } </p>
                </div>
            </div>
            
        </div>

        <div className="background-container mt3 shipping-inputs-container">
            <p className="pdb1"> Informacion de Pago </p>
            <label htmlFor="transactionType"> Como Pagara el cliente </label>
            <select
                className="form-inputs p1 rounded-lg"
                id="transactionType"
                name="transactionType"
                required
                type="text" 
                autoComplete="off"
                onChange={e => paymentMethodHandler(e) }
                value={paymentType} >
                <option value="" disabled>Selecciona </option>
                {
                    transactionType?.map( (obj) =>{
                            return Object.entries(obj).map( ([key, value]) => (
                                <option key={key} value={key}> {value} </option>
                            ))
                    })
                }
            </select>
        </div>
        
        <div className="shipping-button-cont">
            <div className="btn-primary rounded-lg p1 mt1 pointer"  onClick={ (e) =>  handleStepTwo(e, true)  } > Siguente </div>
            <div className="btn-primary rounded-lg p1 mt1 pointer"  onClick={ (e) =>  handleStepOne(e, false) } > Atras </div>
        </div>
    </div>  
    );
}

export default PackageInformation;
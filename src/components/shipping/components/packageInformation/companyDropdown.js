import React, { useState, useEffect, useRef }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";

import AlertMessage from "../../../common/AlertMessage.js";

// imported data
import { encomiendasCompanies } from "../../../../utils/utilsdata.js";
import { personalShippingCompanies } from "../../../../utils/utilsdata.js";

const CompanyDropDown  = ({shippingType, shippingDetails}) => {
    
    return (
        <div>  
           {
           shippingType === "custom"
           ?<div>
                <select value={shippingDetails?.shippingType} 
                        id="department"
                        name="department"
                        onChange={ e => customerDataHandler(e) }
                        className="form-inputs p1 width-100 rounded-lg">
                    <option value="" disabled>Selecciona </option>

                    {
                        personalShippingCompanies?.map( (item, index) => {
                            return <option className="pt15" value={item} key={index}> { item } </option>
                        })
                    }
                </select>
            </div>
            :
            <div >
                <select value={shippingDetails?.shippingType} 
                        id="department"
                        name="department"
                        onChange={ e => customerDataHandler(e) }
                        className="form-inputs p1 width-100 rounded-lg">
                    <option value="" disabled>Selecciona </option>

                    {
                        encomiendasCompanies?.map( (item, index) => {
                            return <option className="pt15" value={item} key={index}> { item } </option>
                        })
                    }
                </select>
            </div>
        }
        </div>  
    );
}

export default CompanyDropDown;
import React, { useState, useEffect }from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


// components
import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";
import Loading from "../common/Loading";
import InfoBox from "../settings/components/InfoBox";

import { selectIsSuperUSer } from "../../features/users/userSlice";
import { useCreateLocationMutation } from "../../features/location/locationApiSlice";
// this is the location form
// only super user
const CreateLocation = ({}) => {
    // check is is super user
    // else redirect to another route
    // const navigate = useNavigate()

    const [createLocation] = useCreateLocationMutation();

    const [formData, setFormData] = useState({  locationType: "", incharge:"", email:"",
        address: "", department: "", city: "", country: "",
        status: "active", cost_center: "", tax:"", isPreTax:true });
    const [errorMessage, setErrorMessage] = useState("");


    const errorMessageHandler = (setErrorMessage) => {
        setErrorMessage(message)
    }

    // handles the form data inputs
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData( (prevData) => ({ ...prevData, [name]:value }))
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            createLocation(formData).unwrap();

        }catch(err) {
            errorMessageHandler(JSON.stringify(err?.data))
        }
    }
    
    return(
        <div className="setting-half-window mt2">
            {
               errorMessage && <ErrorMessage message={errorMessage}
                                             errorMessageHandler={errorMessageHandler}  />
            }
            <form onSubmit={e => onSubmit(e) } className="location-creation-form">
                <div className="setting-title">
                    <h4 className="p1">Tipo de Local: </h4>
                    <InfoBox message={"Tipo de local"}/>
                    <input
                        type="text"
                        className="form-inputs p1 rounded-lg"
                        name="locationType"
                        value={formData.locationType}
                        onChange={handleChange}
                        placeholder="minorista, almacén ect."
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Dueño(a): </h4>
                    <InfoBox message={"Encargado de la tienda"}/>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="incharge"
                        value={formData.incharge}
                        onChange={handleChange}
                        placeholder="John Smith"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Coreo: </h4>
                    <InfoBox message={"Encargado de la tienda"}/>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@gmail.com"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Dirreccion: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 casa#2"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">departamento: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="La Paz"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Ciudad: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Zacatecoluca"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Pais: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="El Salvador"
                    />
                </div>
                
                <div className="setting-title">
                    <h4 className="p1">centro de costos: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="cost_center"
                        value={formData.cost_center}
                        onChange={handleChange}
                        placeholder="Contabilidad"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Impuestos: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        type="text"
                        name="tax"
                        value={formData.tax}
                        onChange={handleChange}
                        placeholder="13.00"
                    />
                </div>


                <button className="btn-primary p1 rounded-lg pointer">
                    Crear Local
                </button>
            </form>
        </div>
    )

}


export default  CreateLocation;
import React, { useState, useEffect }from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


// components
import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";
import Loading from "../common/Loading";
import SearchLocationQuery from "./component/SearchLocationQuery";
import InfoBox from "../settings/components/InfoBox";


import { useCreateUserMutation } from "../../features/users/usersApiSlices";
import { selectLocationId } from "../../features/users/userSlice";
import { selectRoles } from "../../features/users/userRolesSlice";
// get all of the locations and add then to array
// this is the location form
// only super user
const CreateEmployee = ({}) => {

    const locationId = useSelector(selectLocationId);
    const userRoles = useSelector(selectRoles);

    const [createUser, {isSuccess, isLoading}] = useCreateUserMutation();
    const [formData, setFormData] = useState({  username: "", password:"", first_name:"", last_name:"", location: "", position:"" });
    
    const [selectedValue, setSelectedValue] = useState('country');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }
    const successMessageHandler = (message) => {
        setSuccessMessage(message)
    }


    // handles the form data inputs
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData( (prevData) => ({ ...prevData, [name]:value }))
    }
 
    const updatePosition = (event) => {
        setFormData({...formData, position: event.target.value});
    }

    // Creating user
    const createUserSubmit = async (e) => {
        e.preventDefault();
        try{
            const user = await createUser(formData).unwrap();
            // if data is
            console.log("this is create user", user);
        }catch(err) {
            console.log(err)
            errorMessageHandler(JSON.stringify(err?.data))
        }
    }


    useEffect( () => {
        if(locationId){
            setFormData({...formData, location: locationId})
        }
    }, [locationId])


    useEffect(() => {
        if(isSuccess && !isLoading){
            successMessageHandler("items was created succesfuly")
        }
    }, [isSuccess])

    return(
        <div className="setting-half-window mt2">
            {
                errorMessage && <ErrorMessage message={errorMessage}
                errorMessageHandler={errorMessageHandler}/>
            }
            {
                successMessage && <SuccessMessage message={successMessage} 
                successMesageHandler={successMessageHandler}/>
            }
    
            <form onSubmit={e => createUserSubmit(e)} className="location-creation-form">
                <div className="setting-title">
                    <h4 className="p1">usuario: </h4>
                    <InfoBox message={"nombre de usuario"}/>
                    <input
                        type="text"
                        className="form-inputs p1 rounded-lg"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="JohnSmith@gmail.com"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Contraseña: </h4>
                    <InfoBox message={"nombre de usuario"}/>
                    <input
                        type="password"
                        className="form-inputs p1 rounded-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="JNajks!@"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Nombre: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="John"
                    />
                </div>

                <div className="setting-title">
                    <h4 className="p1">Apellido: </h4>
                    <input
                        className="form-inputs p1 rounded-lg"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Smith"
                    />
                </div>


                {
                   userRoles?.includes("Owner") && 
                   <div className="setting-title">
                        <h4 className="p1">Posición: </h4>
                        <select className="p1 rounded-lg" value={formData?.position} onChange={updatePosition}>
                            <option value="">Selecciona Posición</option>
                            <option value="Manager">Manager</option>
                            <option value="Employee">Empleado</option>
                        </select>
                    </div>
                }

                
                <button className="btn-primary p1 mt1 rounded-lg pointer">
                    Crear Empleado
                </button>
            </form>

        </div>
    )

}

export default CreateEmployee
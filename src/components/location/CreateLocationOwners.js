import React, { useState, useEffect }from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


// components
import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";
import Loading from "../common/Loading";
import SearchLocationQuery from "./component/SearchLocationQuery";
import InfoBox from "../settings/components/InfoBox";

import { selectIsSuperUSer } from "../../features/users/userSlice";
import { useLazySearchLocationQuery } from "../../features/location/locationApiSlice";
import { useCreateUserMutation } from "../../features/users/usersApiSlices";

// get all of the locations and add then to array
// this is the location form
// only super user
const CreateLocationOwners = ({}) => {

    const [createUser, {isSuccess, isLoading}] = useCreateUserMutation();
    const [isLocationTrigger, {data: locationData, error, isLoading: IsLocationDataLoading}] = useLazySearchLocationQuery();
    const [formData, setFormData] = useState({  username: "", password:"", first_name:"", last_name:"", location: "" });
    
    const [selectedValue, setSelectedValue] = useState('country');
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [allSearchedLocations, setAllSeachedLocations] = useState([]);

    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }
    const successMessageHandler = (message) => {
        setSuccessMessage(message)
    }

    // this selects what query will be searched
    const optionChangeHandler = (e) => {
        e.preventDefault();
        setSelectedValue(e.target.value);
    }

    // handles the form data inputs
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData( (prevData) => ({ ...prevData, [name]:value }))
    }
    // This handles the search query
    const searchQueryHandler = (e) => {
        const {name, value} = e.target;
        setSearchQuery(value);
        isLocationTrigger({
            storeNumber:`${selectedValue ==='storeNumber' ? value : "" }`,
            country: `${selectedValue ==='country' ? value : "" }`,
            city:`${selectedValue ==='city' ? value : "" }`
        });
    }

    const clearSearchQuery = () => {
        setSearchQuery('');
    }
    
    // updating the location id, and clearing the searchLocation and searchquery
    const updateLocation = (locationId) => {
        setFormData({...formData, location: locationId});
        setAllSeachedLocations([]);
        setSearchQuery("");
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


    // updating the location data
    useEffect(() => {
        if(locationData && searchQuery)
            setAllSeachedLocations(locationData?.data);
    }, [locationData]);

    // clearing the data if search query 
    useEffect( () => {
        if(searchQuery === ""){
            setAllSeachedLocations([]);
        }
    }, [searchQuery]);


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
            <SearchLocationQuery  searchQuery = {searchQuery}
                                    searchQueryHandler = {searchQueryHandler}
                                    selectedValue = {selectedValue}
                                    selectedValueHandler = { optionChangeHandler }
                                    clearSearchQuery = { clearSearchQuery }
                                    // searchLocationSubmit = { searchLocationSubmit }
                                    allSearchedLocations = { allSearchedLocations }
                                    updateLocation = { updateLocation }
            />

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

                <div className="setting-title">
                    <h4 className="p1">Local: </h4>
                    <p> {formData?.location }</p>
                </div>

                <button className="btn-primary p1 mt1 rounded-lg pointer">
                    Crear Dueño
                </button>
            </form>

        </div>
    )

}

export default CreateLocationOwners
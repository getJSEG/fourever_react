import React, { useState, useEffect }from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



// style
import "../../../static/css/components/searchqueryStyle.css"
// components
// import ErrorMessage from "../AlertMessage/ErrorMessage";
// import SuccessMessage from "../AlertMessage/SuccessMessage";
// import Loading from "../common/Loading";
// import InfoBox from "../settings/components/InfoBox";

// import { selectIsSuperUSer } from "../../features/users/userSlice";
// import { useLazySearchLocationQuery } from "../../features/location/locationApiSlice";
// import { useCreateUserMutation } from "../../features/users/usersApiSlices";

/*
1) TODO: create a search field for the location. Search and retrive the data
2) TODO: and apply it to the user information
3) TODO:
4) TODO:

*/

// get all of the locations and add then to array
// this is the location form
// only super user
const SearchLocationQuery = ({searchQuery, clearSearchQuery, selectedValue, selectedValueHandler, searchQueryHandler, allSearchedLocations, updateLocation}) => {

    
    return(
        <div className="mb2 search-location-container">
            <div className="mb1">
                <label>
                    <input
                    type="radio"
                    name="myRadioGroup"
                    value="storeNumber"
                    checked={selectedValue === 'storeNumber'}
                    onChange={selectedValueHandler}
                    />
                    Local
                </label>

                <label className="ml1 mr1">
                    <input
                    type="radio"
                    name="myRadioGroup"
                    value="country"
                    checked={selectedValue === 'country'}
                    onChange={selectedValueHandler}
                    />
                    Pais
                </label>

                <label>
                    <input
                    type="radio"
                    name="myRadioGroup"
                    value="city"
                    checked={selectedValue === 'city'}
                    onChange={selectedValueHandler}
                    />
                    City
                </label>
            </div>


            <form  className="srch-frm mb1">

                <div className="search-location-wrapper">
                    <div className="search-input-location-wrapper">
                        <textarea className="srch-inpt"
                                type="text" 
                                autoComplete="off"
                                onChange={e => searchQueryHandler(e)}
                                value={searchQuery}
                                placeholder="Buscar"
                        />
                        {
                            searchQuery &&  
                            <div className="create-user-search-btn-wrapper">
                                <span className="icn-container pointer" onClick={ clearSearchQuery }>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="18" height="18" className="clear-x" viewBox="2 2 11 11">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </span>
            
                                {/* <button onCLiclassName="icn-container pointer search-btn-crtuser">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="-1 -1 17 17">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>
                                </button>        */}
                            </div>
                        }
                    </div>

                    {
                        allSearchedLocations?.length != 0  && 
                        <div className="location-search-list">
                            {
                                allSearchedLocations?.map( item =>(
                                    <div onClick={() => updateLocation(item?.id) } key={item?.id} className="search-results pointer">
                                        <p className="search-result"> {item?.id }</p>
                                        <p className="search-result"> {item?.storeNumber}</p>
                                        <p className="search-result"> {item?.country}</p>
                                        <p className="search-result"> {item?.city}</p>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                
            </form>


        </div>
    )

}

export default SearchLocationQuery
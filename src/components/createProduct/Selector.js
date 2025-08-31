import React, { useState, useEffect }from "react";

import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";

const Selector  = ({handler, selectedCategories, removeCategorie}) => {

    const { data: catergoryData, isLoading } = useGetCategoriesQuery();

    const [toggle, setToggle] = useState(false);
    const [filtredArray, setFiltedArray] = useState([])


    const handleToggle = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    }

    useEffect(() => {
        setFiltedArray(catergoryData?.filter( item => selectedCategories?.includes(item.id)))
    }, [selectedCategories])


    // Check if its loading here
    // 
    return(
        <div className="selectors-container">
            <div className="form-inputs selected-items p-05 rounded-lg">
                <div className="user-selected-items">
                    {
                        filtredArray?.map( item => (
                            <div  key={item?.id} className="user-selected-item rounded-lg"> 
                                <div className="u-s-selected-item">
                                    <p> {item?.categorie}  </p>
                                </div>
                                <div className="u-s-item-remove pointer" onClick={ (e) => { removeCategorie(item?.id)}}>
                                    <svg height="14" width="14" viewBox="0 0 20 20" focusable="false"  className="css-8mmkcg">
                                        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        ))
                    }
                
                </div>

                <span className="divider"> </span>

                <span  className="arrow-down-container pointer" onClick={ (e) =>{  handleToggle(e) }}>
                    <svg height="20" width="20" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false" className="css-8mmkcg icons-color-dark-blue">
                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z">
                            </path>
                        </svg>

                </span>
            </div>
            
            <div className="selector-data">   
                {
                    toggle ? 
                    catergoryData?.map( item => {
                        if(selectedCategories?.includes(item.id)){
                            return(null)
                        }else{
                            return(<div className="select-data-item rounded-lg pointer" key={item?.id}   onClick={ (e) => handler(item.id) }>
                                {item?.categorie}
                            </div>)
                        }
                    })
                    : null
                }
            </div>
        </div>
    )
}

export default Selector;
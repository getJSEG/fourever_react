import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

const Dashboard  = ({ titleOne, titleTwo, titleTree, infoOne, infoTwo, infoThree }) => {

    return(
      <div id="triple-box-info">
        <div className="triple-box-info-container">

            <div className="background-container box-info box-one">
                <p className="lit-gy-text-color"> {titleOne || ''} </p>
                <h5 className="drk-gy-text-color"> {infoOne || 0} </h5>
            </div>

            <div className="background-container box-info boc-two"> 
                <p className="lit-gy-text-color"> {titleTwo || ''} </p>
                <h5 className="drk-gy-text-color"> {infoTwo || 0} </h5>
            </div>

            <div className="background-container box-info box-three">
                <p className="lit-gy-text-color"> {titleTree || ''} </p>
                <h5 className="drk-gy-text-color"> {infoThree || 0} </h5>
            </div>
        </div>
      </div>  
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(Dashboard);
import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

const Dashboard  = ({ titleOne, titleTwo, titleTree, infoOne, infoTwo, infoThree }) => {

    return(
      <div id="triple-box-info">
        <div className="triple-box-info-container">

            <div className="box-info box-one">
                <p> {titleOne} </p>
                <h5> {infoOne} </h5>
            </div>

            <div className="box-info boc-two"> 
                <p> {titleTwo} </p>
                <h5> {infoTwo} </h5>
            </div>

            <div className="box-info box-three">
                <p> {titleTree} </p>
                <h5> {infoThree} </h5>
            </div>
        </div>
      </div>  
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(Dashboard);
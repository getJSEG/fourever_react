import React, { useEffect, Fragment } from 'react';
import Navbar from '../../components/navigation/Navbar'; 

const Template = ({ children }) => {
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    );
};

export default Template
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import cookieClient from 'reac'


const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState(Cookies.get('username'));


    // const getCookie = (name) => {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         let cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             let cookie = cookies[i].trim();
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                 await axios.get(`http://127.0.0.1:8000/api/session`, { withCredentials: true });

            } catch (err) {

            }
        };

        fetchData();
        setcsrftoken(Cookies.get('csrftoken'));
    }, []);

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;
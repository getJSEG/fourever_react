// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const NumberPad = ({ handlePaymentAmount }) => {

    const [input, setInput] = useState(0);

    const handleNumbers = (event, number) => {
        event.preventDefault();
        setInput( prev => {
            
            if(prev.toString().replace('.', '').length <= 6){
               let  amount = prev === 0 ? number : prev.toString().replace('.', '') + number
                amount = amount.toString().replace(/[^0-9.]/g, '');
                amount = Number(amount / 100 ).toFixed(2);
                return amount
            }else{
                return  prev
            }
        });
    }

    const handleDeleteNumPad = (event) => {
        event.preventDefault();
        setInput( prev => {
            let amount = ''
            amount = prev.toString().replace('.', '').slice(0, -1)
            amount = amount.toString().replace(/[^0-9.]/g, '');
            amount = Number(amount/100).toFixed(2)
            return amount
        });
    }

    const clearInput = (event) => {
        event.preventDefault();
        setInput(0)
    }

    // use useStatne to get the mount inputed
    useEffect(() => {
        handlePaymentAmount(input)
    }, [input])

    // unmounts component
    useEffect( ()=> {
        return( () => { })
    }, [])

    return (
        <div className={`number-pad`}> 

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button className="numpad-btn numbers" key={num} onClick={(event) => handleNumbers(event, num)}>
                    {num}
                    </button>
            ))}
            <button className="numpad-btn delete" onClick={ (e) => { handleDeleteNumPad(e) } } > Del </button>
            <button className="numpad-btn clear" onClick={  (e) => { clearInput(e) } }> Clear </button>
        </div>
    );
}



export default NumberPad;
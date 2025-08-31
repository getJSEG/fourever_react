import axios from "axios";
// this are the status for the packages
// create it here and export it where necessary
// Package Status
export const packageStatusType = [
        {"PROCESSING": "Procesando"},
        {"SHIPPED": "Enviado"},
        {"DELIVERED": "Entregado"},
        {"RETURN": "Devolucion"},
        {"CANCELED": "Cancelado"}
];

// Order Payment Status
export const orderStatusType = [
    {"OPEN": "Avierto"},
    {"CLOSED": "Cerrado"},
    {"PAID": "Pagado"},
    {"PROCESSING": "procesando"},
    {"CANCELED": "Cancelado"},
    {"RETURN": "Retorno"}

];

// Order Transaction
export const transactionType = [
    {"cash":"Efectivo"},
    {"bank_transfer": "Transferencia"}
];

export const personalShippingCompanies = ['Pedidos Express', 'c807 Xpress'];
export const encomiendasCompanies = ['Fernández Express', 'Encomiendas López Express'];
   
//all departments and municipalities in this array
export let allLocations = [];

// fetching all of the locations from el salvador Api
export const getLocations = async () => {
    // check if the array is empty before running
    if(allLocations.length === 0) {
        try{
            // fetch Api to get all of the departments and municipalities of el salvador
            const response = await axios.get('https://api.npoint.io/253f0ee259ef1620a547/departamentos');
            // copy all of the useful information in to the array 
            allLocations = response?.data;
    
        }catch (error) {
            // Throw error if somthing goes wrong
            throw error; 
        }
    }
}


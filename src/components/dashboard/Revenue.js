import React, { useState, useEffect }from "react";

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

import { useGetRevenueQuery } from "../../features/dashboard/revenueApiSlice";

// Compoenents
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";

/* Low Inventory */
const Revenue  = () => {

    const [optionId, setopt] = useState(1);

    const {
        data:
        revenueData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRevenueQuery(optionId);

    const handleOptionSelect = (e) => {
        e.preventDefault()
        setopt(Number(e.target.value))
    }
    let content = isLoading ? <Loading /> : ( <section className="chart-container">
          
          <div className="revenue-chart background-container chart-wrapper">
              <div className="chart-info">
                  <h3> Ventas </h3>
                  <div className="graph-selector-info">
                      <p>Mostrar por</p>
                      <select onChange={ (e) => handleOptionSelect(e) }  defaultValue="1" >
                          <option value="1"> Dia </option>
                          <option value="2"> Semana </option>
                          <option value="3" > Mes </option>
                      </select>
                  </div>
              </div>

              {
                  !isLoading ? <Bar data= {{
                                labels: revenueData.map( (data) => data.label ),
                                    datasets: [
                                        {
                                        label: "Ganacias",
                                        data: revenueData.map( (data) => data.value ),
                                    }]
                                }} />  : null
              }
          </div>
      </section>
      )

    return content
}

export default Revenue;
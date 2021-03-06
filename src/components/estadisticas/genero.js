import React, {useEffect,useState} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {getEstadisticas} from '../../services/adminService';


export default function Genero() {

    const [estadisticas, setEstadisticas] = useState([])
    const valores = ["hombres","mujeres","otros"];

    const options = {
        title: {
          text: '',
          enabled: false
        },
        chart: {
            type: 'pie'
        },
        plotOptions: {
            pie: {
                colors: ["#6bb9fb","#ff72a0","#a36eec"],
            },
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span>{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
        },
        series: [{
            name: "Generos",
            type: "pie",
            data: estadisticas
        }]
    }
    
    useEffect(()=>{
        let datos = []
        getEstadisticas('genero')
        .then((data) => {
            valores.map((valor)=>{
                datos.push({
                    name: valor.trim().replace(/^\w/, (c) => c.toUpperCase()), //valor, 
                    y: data[valor]
                })
            })
            setEstadisticas(datos)
        })
    },[])

    return(
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}
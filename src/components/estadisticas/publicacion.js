import React, {useEffect,useState} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {getEstadisticas} from '../../services/adminService';


export default function Publicacion() {

    const [estadisticas, setEstadisticas] = useState([])
    const valores = ["texto","encuesta","foto","video"];

    const options = {
        title: {
          text: '',
          enabled: false
        },
        chart: {
            type: 'pie'
        },
        plotOptions: {
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
            name: "Publicaciones",
            type: "pie",
            data: estadisticas,
        }]
    }
    
    useEffect(()=>{
        let datos = []
        getEstadisticas('tipo-publicaciones')
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
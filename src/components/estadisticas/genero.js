import React, {useEffect,useState} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {getEstadisticasGenero} from '../../services/adminService';


export default function Genero() {

    const [estadisticas, setEstadisticas] = useState([])
    const valores = ["hombres","mujeres","otros"];

    const options = {
        title: {
          text: '',
          enabled: false
        },
        chart: {
            type: 'column'
        },
        xAxis: {type: "category"},
        yAxis: {
            title: { text: "Cantidad de usuarios"}
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
        },
        series: [{
            name: "Generos",
            data: estadisticas
        }]
    }
    
    useEffect(()=>{
        let datos = []
        getEstadisticasGenero()
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
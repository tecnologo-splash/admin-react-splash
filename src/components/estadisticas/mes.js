import React, {useEffect,useState} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {getEstadisticas} from '../../services/adminService';


export default function Mes() {

    const [estadisticas, setEstadisticas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const options = {
        title: {
          text: '',
          enabled: false
        },
        chart: {
            type: 'pie'
        },
        xAxis: {
            type: "category",
            categories: categorias
        },
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
            headerFormat: '<span style="font-size:11px">{series.name}:</span><br>',
            pointFormat: '<span style="text-align: center">{point.name}<b>{point.y}</b></span>'
        },
        series: [{
            name: "Usuarios registrados",
            type: "column",
            color: '#6d31bf',
            data: estadisticas
        }]
    }
    
    
    useEffect(()=>{
        let datos = [];
        let categ = [];
        getEstadisticas('usuarios-registrados-por-mes')
        .then((data) => {
            categ = data.map(d => d.to_char);
            datos = data.map(d => d.count);
            setCategorias(categ);
            setEstadisticas(datos);

            console.log(categ, datos)
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
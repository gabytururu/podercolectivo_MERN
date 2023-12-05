import{Bar} from 'react-chartjs-2'
import {Chart as ChartJs, BarElement} from 'chart.js/auto'
import 'chartjs-plugin-datalabels'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import './BarChart.css'
// import { useContext } from 'react'
// import {QuejasContext} from '../../Context/QuejasContext' 

// ChartJs.register(
//     BarElement,
//     ChartDataLabels
// )

const BarChart = ({chartData}) => {
    // const {barChartRadius, barChartColor} = useContext(QuejasContext)
    let options= {
        maintainAspectRatio: false,
        responsive: true,
        scales:{
            y:{
                beginAtZero:true,
                ticks:{
                    color:'gray',
                    font:{
                        size: 13,
                    },
                    // stepSize:2000,
                    //maxTicksLimit:10
                },
                grace: 0.5,// no se porque deja ese extra por arriba como barras salidas despues del final.
                grid: {
                    display:true,
                }
            },
            x:{
                ticks:{
                    color:'gray',       
                    font:{
                        size:12,           
                    },
                },
                grid:{
                    display:false,
                },
            }, 
            
        },
        layout:{
            padding:30
        },
        plugins:{
            legend:{
                labels:{
                    color: '#444444',
                    font:{
                        size:15,
                        weight:700,
                    }
                },
                display:true,
                position:'bottom',           
            },       
            datalabels:{
                color: '#444444',
                align: 'end',
                anchor: 'end',
                offset: 0,
                font:{
                    size:13,
                    weight:500
                },
                // padding: 7,
                // rotation:320,
                // backgroundColor:[
                //     'black'
                // ],
                // borderRadius: 50  
            }
        }
     }

    return ( 
        <div className="backdropImg">       
            <Bar data={chartData}  plugins={[ChartDataLabels]} options={options}/>
        </div>
        
     );
}
 
export default BarChart;        
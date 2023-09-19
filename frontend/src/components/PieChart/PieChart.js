import{Pie} from 'react-chartjs-2'
import {Chart as ChartJs, PieElement} from 'chart.js/auto'
import 'chartjs-plugin-datalabels'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import './PieChart.css'
// import { useContext } from 'react'
// import {QuejasContext} from '../../Context/QuejasContext' 

// ChartJs.register(
//     BarElement,
//     ChartDataLabels
// )

const PieChart = ({chartData}) => {
    // const {barChartRadius, barChartColor} = useContext(QuejasContext)
    let options= {
        maintainAspectRatio: false,
        responsive: true,
        scales:{
            y:{
                beginAtZero:true,
                ticks:{
                    stepSize:1,
                    color:'black',
                    font:{
                        size: 15,
                    }
                },
                grace:0.5 // no se porque deja ese extra por arriba como barras salidas despues del final
            },
            x:{
                ticks:{
                    color:'black',       
                    font:{
                        size:14,           
                    }
                }
            }
        },
        layout:{
            padding:15
        },
        plugins:{
            legend:{
                labels:{
                    color: 'black',
                    font:{
                        size:17,
                        weight:700,
                    }
                },
                display:true,
                position:'bottom',           
            },       
            datalabels:{
                color: '#464646',
                align: 'end',
                anchor: 'end',
                offset: 0,
                font:{
                    size:17,
                    weight:700
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
            <Pie data={chartData}  plugins={[ChartDataLabels]} options={options}/>
        </div>
        
     );
}
 
export default PieChart;        
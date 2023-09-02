import{Bar} from 'react-chartjs-2'
import {Chart as ChartJs, BarElement} from 'chart.js/auto'
import 'chartjs-plugin-datalabels'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import './BarChart.css'

// ChartJs.register(
//     BarElement,
//     ChartDataLabels
// )


let options= {
    maintainAspectRatio: false,
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
                    size:17,            
                }
            }
        }
    },
    layout:{
        padding:10
    },
    plugins:{
        legend:{
            labels:{
                font:{
                    size:20,
                    weight:700
                }
            },
            display:true,
            position:'bottom',           
        },       
        datalabels:{
            color:'white',
            align: 'center',
            anchor: 'center',
            offset: 3,
            font:{
                size:17,
                weight:700
            },
            padding: 7,
            rotation:320,
            backgroundColor:[
                'blue'
            ],
            borderRadius: 50  
        }
    }
 }
const BarChart = ({chartData}) => {
    return ( 
        <div className="backdropImg">       
            <Bar data={chartData}  plugins={[ChartDataLabels]} options={options}/>
        </div>
        
     );
}
 
export default BarChart;
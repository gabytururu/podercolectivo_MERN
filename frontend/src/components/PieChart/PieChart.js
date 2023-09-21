import{ Pie } from 'react-chartjs-2'
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js/auto'
import 'chartjs-plugin-datalabels'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import './PieChart.css'
// import { useContext } from 'react'
// import {QuejasContext} from '../../Context/QuejasContext' 

ChartJs.register(
    ArcElement, Tooltip, Legend
)

// const PieChart = ({chartData}) => {
const PieChart = ({chartData}) => {
    
   

    const options={
        maintainAspectRatio:false,
        responsive:true,
        scales:{},
        plugins:{
            legend:{
                // labels:{
                //     color: 'blue',
                //     font:{
                //         size:17,
                //         weight:700,
                //     }
                // },
               display:true,
                position:'bottom',           
            },       
            datalabels:{
                color:'#464646',
                align: 'center',
                anchor: 'center',
                offset: 0,
                font:{
                    size:15,
                    weight:700
                },
            }
        }
    }

    return ( 
        <div className="pieChartContainer">       
            {/* <Pie data={chartData}  plugins={[ChartDataLabels]} options={options}/> */}
            {/* <Pie data={chartData} options={options}  /> */}
            <Pie data={chartData} plugins={[ChartDataLabels]} options={options} />
        </div>
        
     );
}
 
export default PieChart;        
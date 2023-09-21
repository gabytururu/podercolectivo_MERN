import{ Pie } from 'react-chartjs-2'
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js/auto'
import 'chartjs-plugin-datalabels'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import './PieChart.css'
// import { useContext } from 'react'
// import {QuejasContext} from '../../Context/QuejasContext' 

// ChartJs.register(
//     ArcElement, Tooltip, Legend
// )

// const PieChart = ({chartData}) => {
const PieChart = ({chartData}) => {
    
    // const data = {
    //     labels:['one','two','three'],
    //     datasets:[{
    //             data:[3,6,9],
    //             backgroundColor: ['aqua', 'bloodorange','purple']
    //         }]
    // };

    // const options={}

    return ( 
        <div className="pieChartContainer">       
            {/* <Pie data={chartData}  plugins={[ChartDataLabels]} options={options}/> */}
            {/* <Pie data={chartData} options={options}  /> */}
            <Pie data={chartData} />
        </div>
        
     );
}
 
export default PieChart;        
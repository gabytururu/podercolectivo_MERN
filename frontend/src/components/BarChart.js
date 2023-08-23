import{Bar} from 'react-chartjs-2'
import {Chart as ChartJs, BarElement} from 'chart.js/auto'
ChartJs.register(
    BarElement
)
const BarChart = ({chartData}) => {


    return ( 
        // <Bar data={chartData} options={{}}/>
        <Bar data={chartData} />
     );
}
 
export default BarChart;
/* eslint-disable prettier/prettier */
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

export default function WeatherGraph({
  datetime,
  temperature,
  rain,
  city
} : { datetime: Array<any>, temperature: Array<any>, rain: Array<any>, city? : string}){

  const data = {
    labels: datetime.map(d => new Date(d).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })),
    datasets: [
      {
        label: 'Temperature',
        data: temperature,
        backgroundColor: '#53A2BE',
        borderColor: '#176087',
        borderWidth: 1,
        tension: 0.4
      },
      {
        label: 'Rain',
        data: rain,
        backgroundColor: '#176087',
        borderColor: '#53A2BE',
        borderWidth: 1,
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: `Weather Report ${city ? '- ' + city : "" }`
      }
    }
  }

  return <Line data={data} options={options}/>
}

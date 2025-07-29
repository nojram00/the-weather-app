/* eslint-disable prettier/prettier */
import { WeatherForecastApi } from '@renderer/weather-sdk/forecast'
import { useEffect } from 'react'

export default function Test() {
  useEffect(() => {
    const forecast = new WeatherForecastApi({
      latitude: '0',
      longitude: '0'
    });

    forecast.get_hourly('rain', 'temperature_2m').then(responses => {
      console.log(responses);
      // if(responses === undefined) return
      // const response = responses[0] as { rain : {
      //   time: Array<string>
      //   data: Array<string>
      // }}
      // console.log({
      //   rain: {
      //     time: response.rain.time,
      //     data: response.rain.data
      //   }
      // })
    })
  })
  return <div>test</div>
}

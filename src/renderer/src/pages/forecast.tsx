import Layout from '@renderer/components/layout'
import WeatherGraph from '@renderer/components/weather-graph'
import { useGeo } from '@renderer/hooks/ipapi'
import { useWeather } from '@renderer/hooks/weather'
import { useEffect, useMemo, useState } from 'react'

export default function Forecast() {
  const hourly = useMemo(() => ['rain', 'temperature_2m'], [])
  const [datetime, setDatetime] = useState<Array<any>>([])
  const [rain, setRain] = useState<Array<any>>([])
  const [temp, setTemp] = useState<Array<any>>([])

  const [pending, setPending] = useState<boolean>(true)

  const { latitude, longitude, city } = useGeo()

  const { weatherData, refetch } = useWeather({
    long: 0,
    lat: 0,
    hour: hourly
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const { longitude, latitude } = pos.coords

        refetch({ lat: latitude, long: longitude, hour: hourly })

        setPending(false)
      },
      function () {
        console.log('Coords: ', { latitude, longitude })
        if (typeof latitude === 'number' && typeof longitude === 'number') {
          refetch({ lat: latitude, long: longitude, hour: hourly })
          setPending(false)
        }
      }
    )
  }, [latitude, longitude, hourly])

  useEffect(() => {
    if (!weatherData || weatherData.length === 0) return
    // const data = weatherData?.map((wd) => {
    //   return {
    //     time: wd.weather_data.hourly.time,
    //     rain: wd.weather_data.hourly.variables(1),
    //     temp_2m: wd.weather_data.hourly.variables(0)
    //   }
    // })
    const _datetime = weatherData?.map((wd) => wd.weather_data.hourly.time) as Array<any>
    const _rain = weatherData?.map((wd) => wd.weather_data.hourly.variables(1)) as Array<any>
    const temperature = weatherData?.map((wd) => wd.weather_data.hourly.variables(0)) as Array<any>

    setDatetime(_datetime[0].slice(0, 24))
    setRain(_rain[0].slice(0, 24))
    setTemp(temperature[0].slice(0, 24))

    // console.log(_datetime[0].slice(0, 14))
  }, [weatherData])
  // const router =
  return (
    <Layout>
      <main className="w-full h-screen p-10 flex items-center justify-around">
        {pending && <div>Getting Forecast Results...</div>}
        {!pending && <WeatherGraph city={city} datetime={datetime} rain={rain} temperature={temp} />}
      </main>
    </Layout>
  )
}

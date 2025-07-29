import Layout from '@renderer/components/layout'
import WeatherGraph from '@renderer/components/weather-graph'
import { useGeo } from '@renderer/hooks/ipapi'
import { WeatherForecastApi } from '@renderer/weather-sdk/forecast'
import { useEffect, useMemo, useState } from 'react'

export default function Forecast() {
  const hourly = useMemo(() => ['rain', 'temperature_2m'], [])
  const [datetime, setDatetime] = useState<Array<any>>([])
  const [rain, setRain] = useState<Array<any>>([])
  const [temp, setTemp] = useState<Array<any>>([])

  const [pending, setPending] = useState<boolean>(true)

  const { latitude, longitude, city } = useGeo()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const { longitude, latitude } = pos.coords
        const forecast = new WeatherForecastApi({
          longitude,
          latitude
        })

        forecast.get_hourly(...hourly).then((responses) => {
          if (responses != undefined) {
            const response = responses[0]
            setDatetime(response.time.slice(0, 24))
            setRain((response.data['rain'].data as Array<string>).slice(0, 24))
            setTemp((response.data['temperature_2m'].data as Array<string>).slice(0, 24))
          }
        })

        setPending(false)
      },
      function () {
        if (typeof latitude === 'number' && typeof longitude === 'number') {
          const forecast = new WeatherForecastApi({
            longitude,
            latitude
          })

          forecast.get_hourly(...hourly).then((responses) => {
            if (responses != undefined) {
              const response = responses[0]
              setDatetime(response.time.slice(0, 24))
              setRain((response.data['rain'].data as Array<string>).slice(0, 24))
              setTemp((response.data['temperature_2m'].data as Array<string>).slice(0, 24))
            }
          })

          setPending(false)
        }
      }
    )
  }, [latitude, longitude, hourly])

  return (
    <Layout>
      <main className="w-full h-screen p-10 flex items-center justify-around">
        {pending && <div>Getting Forecast Results...</div>}
        {!pending && (
          <WeatherGraph city={city} datetime={datetime} rain={rain} temperature={temp} />
        )}
      </main>
    </Layout>
  )
}

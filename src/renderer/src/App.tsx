import { useEffect, useMemo, useState } from 'react'
import Layout from './components/layout'
import { useWeather } from './hooks/weather'
import { useGeo } from './hooks/ipapi'
import { Sunrise, Sunset } from './components/sun-cards'
import RealtimeClock from './components/realtime-clock'

function App(): React.JSX.Element {
  const daily = useMemo(() => ['sunrise', 'sunset'], [])
  const [pending, setPending] = useState<boolean>(true)

  const [sunrise_sunset, setSun] = useState({
    sunrise: '',
    sunset: ''
  })

  const { latitude, longitude, city, country } = useGeo()

  const { weatherData, refetch } = useWeather({
    long: 0,
    lat: 0,
    daily,
    forecast_days: 1
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const { longitude, latitude } = pos.coords

        refetch({ lat: latitude, long: longitude, daily, forecast_days: 1 })

        setPending(false)
      },
      function () {
        console.log('Coords: ', { latitude, longitude })
        if (typeof latitude === 'number' && typeof longitude === 'number') {
          refetch({ lat: latitude, long: longitude, daily, forecast_days: 1 })
          setPending(false)
        }
      }
    )
  }, [longitude, latitude, daily])

  useEffect(() => {
    if (weatherData && !pending) {
      const _sunrise = weatherData[0].weather_data.daily.sunrise[0]
      const _sunset = weatherData[0].weather_data.daily.sunset[0]

      console.log(weatherData[0])

      console.log(_sunrise) // Tue Jul 29 2025 14:02:57 GMT+0800 (Philippine Standard Time)
      setSun({
        sunrise: new Date(_sunrise).toLocaleString('en-PH', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        sunset: new Date(_sunset).toLocaleString('en-PH', {
          hour: '2-digit',
          minute: '2-digit'
        })
      })
    }
  }, [weatherData, pending])

  const greet = () => {
    const time = new Date().getHours()

    if (time < 12) {
      return 'Good morning'
    } else if (time >= 12 && time < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }
  return (
    <Layout>
      <main>
        {pending && <span>Getting Data Results...</span>}
        {!pending && (
          <div className="container">
            <div className="gridbox">
              <Sunrise time={sunrise_sunset.sunrise} />
              <Sunset time={sunrise_sunset.sunset} />
            </div>
            <div className="wrapper">
              <span>{greet()}!</span>
              <span className="city">
                {city} <p>{country}</p>
              </span>
              <RealtimeClock />
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
}

export default App

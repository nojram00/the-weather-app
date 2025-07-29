import { useEffect, useMemo, useState } from 'react'
import Layout from './components/layout'
import { useGeo } from './hooks/ipapi'
import { Sunrise, Sunset } from './components/sun-cards'
import RealtimeClock from './components/realtime-clock'
import { AstronomicalData } from './weather-sdk/astronomical-data'

function App(): React.JSX.Element {
  const daily = useMemo(() => ['sunrise', 'sunset'], [])
  const [pending, setPending] = useState<boolean>(true)

  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')

  const { latitude, longitude, city, country } = useGeo()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const { longitude, latitude } = pos.coords

        // refetch({ lat: latitude, long: longitude, daily, forecast_days: 1 })

        const forecast = new AstronomicalData({
          longitude,
          latitude,
          forecast_days: 1
        })

        forecast.sunrise.then((result) => {
          setSunrise(result[0].toLocaleTimeString())
        })

        forecast.sunset.then((result) => {
          setSunset(result[0].toLocaleTimeString())
        })

        setPending(false)
      },
      function () {
        console.log('Coords: ', { latitude, longitude })
        if (typeof latitude === 'number' && typeof longitude === 'number') {
          const forecast = new AstronomicalData({
            longitude,
            latitude,
            forecast_days: 1
          })

          forecast.sunrise.then((result) => {
            setSunrise(result[0].toLocaleTimeString())
          })

          forecast.sunset.then((result) => {
            setSunset(result[0].toLocaleTimeString())
          })

          setPending(false)
        }
      }
    )
  }, [longitude, latitude, daily])

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
              <Sunrise time={sunrise} />
              <Sunset time={sunset} />
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

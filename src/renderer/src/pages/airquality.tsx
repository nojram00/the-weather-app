import AQIGraph from '@renderer/components/aqi-graph'
import Layout from '@renderer/components/layout'
import { useGeo } from '@renderer/hooks/ipapi'
import { useLayout } from '@renderer/hooks/layoutContext'
import useAQI from '@renderer/hooks/useAQI'
import { useEffect, useState } from 'react'

export default function AirQuality() {
  const [data, setdata] = useAQI()
  const { longitude, latitude, city } = useGeo()
  const [pending, setPending] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const { longitude, latitude } = pos.coords
        if (typeof longitude === 'number' && typeof latitude === 'number') {
          setdata({
            longitude,
            latitude
          })

          setPending(false)
        }
      },
      function () {
        console.log(longitude, latitude)
        if (typeof longitude !== 'number' || typeof latitude !== 'number') return
        setdata({
          longitude,
          latitude
        })

        setPending(false)
      }
    )
  }, [latitude, longitude])

  useEffect(() => {
    console.log(data.pm10)
  }, [data])

  const { showVisual } = useLayout()

  useEffect(() => {
    console.log(showVisual)
  }, [showVisual])

  return (
    <Layout>
      <main className="w-full h-screen p-10 flex items-center justify-around">
        {pending && <div>Getting AQI Results...</div>}
        {!pending && (
          <AQIGraph
            time={data.time.slice(0, 24)}
            pm_10={(data.pm10 as any[]).slice(0, 24)}
            pm_2_5={(data.pm2_5 as any[]).slice(0, 24)}
            city={city as string}
          />
        )}
      </main>
    </Layout>
  )
}

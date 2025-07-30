import { AirQualityIndex } from '@renderer/weather-sdk/airquality-index'
import { useState } from 'react'

type AQIData = {
  pm10: Float32Array<ArrayBufferLike> | never[]
  pm2_5: Float32Array<ArrayBufferLike> | never[]
  time: Date[] | never[]
}

type SetAQIData = (pos: { longitude: number; latitude: number }) => void

export default function useAQI(): [AQIData, SetAQIData] {
  const [pm10, set_pm10] = useState<Float32Array<ArrayBufferLike> | never[]>([])
  const [pm2_5, set_pm2_5] = useState<Float32Array<ArrayBufferLike> | never[]>([])
  const [time, setTime] = useState<Date[] | never[]>([])

  function set({ longitude, latitude }) {
    console.log(longitude, latitude)
    const airqualityIndex = new AirQualityIndex({ longitude, latitude })

    airqualityIndex.pm10.then((result) => {
      if (result) {
        set_pm10(result)
      }
    })

    airqualityIndex.pm2_5.then((result) => {
      if (result) {
        set_pm2_5(result)
      }
    })

    airqualityIndex.time.then((result) => {
      if (result) {
        setTime(result)
      }
    })
  }

  return [{ pm10, pm2_5, time }, set]
}

import { fetchWeatherApi } from 'openmeteo'
import { useEffect, useState } from 'react'

export function useWeather({
  long,
  lat,
  hour,
  daily
}: {
  long: number
  lat: number
  hour?: string | string[]
  daily?: string | string[]
}) {
  const url = 'https://api.open-meteo.com/v1/forecast'
  const [weatherData, setWeatherData] = useState<Array<any> | null>(null)

  function refetch({ long, lat, hour }) {
    console.log(long, lat)
    fetchWeatherApi(url, {
      latitude: lat,
      longitude: long,
      hourly: hour ?? [],
      daily: daily ?? []
    }).then((responses) => {
      setWeatherData(
        responses.map((weatherResponse, idx) => {
          const hourly = weatherResponse.hourly()
          const dailydata = weatherResponse.daily()

          const _weatherData = {
            hourly: {
              // temperature_2m: hourly?.variables(0)!.valuesArray()
            },
            daily: {}
          }

          if (hourly) {
            Object.assign(_weatherData, {
              hourly: {
                length: hourly?.variablesLength(),
                time: [
                  ...Array(
                    (Number(hourly?.timeEnd()) - Number(hourly?.time())) / (hourly?.interval() ?? 1)
                  )
                ].map(
                  (_, i) =>
                    new Date(
                      (Number(hourly?.time()) + i * (hourly?.interval() ?? 1)) * 1000 +
                        weatherResponse.utcOffsetSeconds() * 1000
                    )
                ),
                data: Array(hourly?.variablesLength()).map((_, idx) => {
                  const id = idx - 1
                  return { [id]: hourly?.variables(id)?.valuesArray() }
                }),
                variables: (idx: number) => {
                  return hourly?.variables(idx)?.valuesArray()
                }
              }
            })
          }

          if (dailydata && hourly) {
            Object.assign(_weatherData, {
              daily: {
                time: [
                  ...Array(
                    (Number(dailydata.timeEnd()) - Number(dailydata.time())) / dailydata.interval()
                  )
                ].map(
                  (_, i) =>
                    new Date(
                      (Number(dailydata.time()) +
                        i * hourly?.interval() +
                        weatherResponse.utcOffsetSeconds()) *
                        1000
                    )
                )
              }
            })
          }

          return {
            latitude: weatherResponse.latitude(),
            longitude: weatherResponse.longitude(),
            elevation: weatherResponse.elevation(),
            timezone: weatherResponse.timezone(),
            timezone_abbreviation: weatherResponse.timezoneAbbreviation(),
            utc_offset_seconds: weatherResponse.utcOffsetSeconds(),
            hourly,
            weather_data: _weatherData
          }
        })
      )
    })
  }

  useEffect(() => {
    refetch({ long, lat, hour })
  }, [long, lat, hour])

  return { weatherData, refetch }
}

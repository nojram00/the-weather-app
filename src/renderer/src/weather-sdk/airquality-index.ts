/* eslint-disable prettier/prettier */
import { _ } from "react-router/dist/development/index-react-server-client-Bi_fx8qz";
import { BaseWeatherApi } from "./base";

interface Coordinates {
  longitude: string | number
  latitude: string | number
}

export class AirQualityIndex extends BaseWeatherApi<Coordinates & {
  hourly: string[]
}>{
  constructor(props: Coordinates){
    super('https://air-quality-api.open-meteo.com/v1/air-quality', {
      ...props,
      hourly: ['pm10', 'pm2_5']
    })
  }

  get time(){
    return this.responses.then(res => {
      const _hourly = res[0].hourly();
      const utc_offset_seconds = res[0].utcOffsetSeconds()

      return [...Array((Number(_hourly?.timeEnd()) - Number(_hourly?.time())) / (_hourly?.interval() ?? 0))]
        .map((_, i) => {
          return new Date((Number(_hourly?.time()) + i * (_hourly?.interval() ?? 0) + utc_offset_seconds) * 1000)
        })
    })
  }

  get pm10(){
    return this.responses.then(res => {
      const _hourly = res[0].hourly();

      return _hourly?.variables(0)?.valuesArray()
    })
  }

  get pm2_5(){
    return this.responses.then(res => {
      const _hourly = res[0].hourly();

      return _hourly?.variables(1)?.valuesArray()
    })
  }
}
/* eslint-disable prettier/prettier */
import { BaseWeatherApi } from "./base";

interface AstronomicalDataProps {
  longitude: number | string;
  latitude: number | string;
  forecast_days?: number | null
}

export class AstronomicalData extends BaseWeatherApi<AstronomicalDataProps & {
  daily: Array<string>
}>{
  constructor(props : AstronomicalDataProps){
    props.forecast_days = props.forecast_days ?? 7
    super('https://api.open-meteo.com/v1/forecast', {
      ...props,
      daily: ['sunrise', 'sunset']
    });
  }

  get sunrise(){
    return this.responses.then(res => {
      const _daily = res[0].daily();
      const utc_offset_seconds = res[0].utcOffsetSeconds()

      const _sunrise = _daily?.variables(0)

      return [...Array(_sunrise?.valuesInt64Length())].map(
        (_, i) => new Date((Number(_sunrise?.valuesInt64(i)) + utc_offset_seconds) * 1000)
      )
    })
  }

  get sunset(){
    return this.responses.then(res => {
      const _daily = res[0].daily();
      const utc_offset_seconds = res[0].utcOffsetSeconds()

      const _sunset = _daily?.variables(1)

      return [...Array(_sunset?.valuesInt64Length())].map(
        (_, i) => new Date((Number(_sunset?.valuesInt64(i)) + utc_offset_seconds) * 1000)
      )
    })
  }
}
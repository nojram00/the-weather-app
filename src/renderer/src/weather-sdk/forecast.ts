/* eslint-disable prettier/prettier */
import { BaseWeatherApi } from "./base";

export interface ForecastProperties {
  longitude: string | number,
  latitude: string | number,
  forecast_days?: number
}

export class WeatherForecastApi extends BaseWeatherApi<ForecastProperties>{

  constructor(props : ForecastProperties){
    super('https://api.open-meteo.com/v1/forecast', props);
  }

}
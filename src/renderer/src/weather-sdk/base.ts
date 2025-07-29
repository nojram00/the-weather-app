import { fetchWeatherApi } from 'openmeteo'

/* eslint-disable prettier/prettier */
export class BaseWeatherApi<T> {

  url: string = ''
  props: T | null = null

  constructor(url : string, props : T) {
    this.url = url
    this.props = props
  }

  fetch<T>(params : T){
    return fetchWeatherApi(this.url, params)
  }

  get responses(){
    return fetchWeatherApi(this.url, this.props)
  }

  get utcOffesetSeconds(){
    return this.responses.then(res => {
      return res[0].utcOffsetSeconds()
    })
  }

  get daily(){
    return this.responses.then(res => {
      const _daily = res[0].daily();

      return _daily
    })
  }

  get hourly(){
    return this.responses.then(res => {
      const _hourly = res[0].hourly();

      return _hourly
    })
  }

  generate_time(hourly, utc_offset_seconds){
    return [
      ...Array(
        (Number(hourly?.timeEnd()) - Number(hourly?.time())) / (hourly?.interval() ?? 1)
      )
    ].map((_, i) => {
      return new Date(
        (Number(hourly?.time()) + i * (hourly?.interval() ?? 1)) * 1000 +
          utc_offset_seconds * 1000
      ).toLocaleString().replace(/\//g,"-")
    })
  }

  generate_date(daily, utc_offset_seconds){
    return [
      ...Array(
        (Number(daily?.timeEnd()) - Number(daily?.time())) / (daily?.interval() ?? 1)
      )
    ].map((_, i) => {
      return new Date(
        (Number(daily?.time()) + i * (daily?.interval() ?? 1)) * 1000 +
          utc_offset_seconds * 1000
      ).toLocaleDateString().replace(/\//g,"-")
    })
  }

  async get_hourly(...hourly : string[]){
    if(this.props == null) return;
    const props = Object.assign(this.props, {
      hourly: hourly.length == 1 ? hourly[0] : hourly
    })
    const responses = await this.fetch(props);
    console.log(responses);

    return responses.map(response => {
      const _hourly = response.hourly();
      const utc_offset_seconds = response.utcOffsetSeconds();

      const time = this.generate_time(_hourly, utc_offset_seconds)

      console.info('Getting results from this coord: ', {
        x: response.latitude(),
        y: response.longitude()
      })

      const data = {};
      if(props.hourly instanceof Array){
        props.hourly.forEach((h : string, idx: number) => {
          data[h] = {
            data: _hourly?.variables(idx)?.valuesArray()
          }
        })
      }
      else{
        data[props.hourly] = {
          data: _hourly?.variables(0)?.valuesArray()
        }
      }

      return { time, data };
    })
  }

  async get_daily(...daily: string[]){
    if(this.props == null) return;
    const props = Object.assign(this.props, {
      daily: daily.length == 1 ? daily[0] : daily
    })
    const responses = await this.fetch(props);
    console.log(responses);

    return responses.map(response => {
      const _daily = response.daily();
      const utc_offset_seconds = response.utcOffsetSeconds();

      const time = this.generate_date(_daily, utc_offset_seconds)

      console.info('Getting results from this coord: ', {
        x: response.latitude(),
        y: response.longitude()
      })

      const data = {};
      if(props.daily instanceof Array){
        props.daily.forEach((d : string, idx: number) => {
          data[d] = {
            data: _daily?.variables(idx)?.valuesArray()
          }
        })
      }
      else{
        data[props.daily] = {
          data: _daily?.variables(0)?.valuesArray()
        }
      }

      return { time, data };
    })
  }
}

import { useEffect, useState } from 'react'

export interface IPGeolocationData {
  ip: string
  network: string
  version: 'IPv4' | 'IPv6'
  city: string
  region: string
  region_code: string
  country: string
  country_name: string
  country_code: string
  country_code_iso3: string
  country_capital: string
  country_tld: string
  continent_code: string
  in_eu: boolean
  postal: string
  latitude: number
  longitude: number
  timezone: string
  utc_offset: string
  country_calling_code: string
  currency: string
  currency_name: string
  languages: string
  country_area: number
  country_population: number
  asn: string
  org: string
}

export function useGeo() {
  const [data, setData] = useState<IPGeolocationData | null>()

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((_data) => setData(_data))
  }, [])

  return { ...data }
}

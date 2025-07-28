import React from 'react'

export function useFetch<T>({ url, options = { method: 'GET' } }) {
  const [data, setData] = React.useState<T>()
  const [pending, setPending] = React.useState(true)

  React.useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((_data) => {
        setData(_data)
      })
    setPending(false)
  }, [url, options])

  return [data, pending]
}

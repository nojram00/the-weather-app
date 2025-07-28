import { useEffect, useRef } from 'react'

export default function Chart(props: { width?: string | number; height?: string | number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')

      const data = [20, 40, 10, 60, 30, 90, 50]
      const padding = 50
      const chartWidth = canvasRef.current.width - padding * 2
      const chartHeight = canvasRef.current.height - padding * 2
      const maxValue = Math.max(...data)
      const stepX = chartWidth / (data.length - 1)

      if (ctx) {
        ctx?.beginPath()
        ctx?.moveTo(padding, padding)
        ctx?.lineTo(padding, canvasRef.current.height - padding)
        ctx?.lineTo(canvasRef.current.width - padding, canvasRef.current.height - padding)
        ctx && (ctx.strokeStyle = '#333')
        ctx && (ctx.lineWidth = 2)
        ctx?.stroke()

        ctx?.beginPath()
        data.forEach((val, i) => {
          const x = padding + i * stepX
          const y = canvasRef.current?.height ?? 0 - padding - (val / maxValue) * chartHeight
          ctx?.lineTo(x, y)
          ctx && (ctx.fillStyle = 'blue')
          ctx?.fill()
          ctx.beginPath()
          ctx.moveTo(x, y)
        })

        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }
  }, [])

  return <canvas ref={canvasRef} width={props.width ?? 220} height={props.height ?? 220}></canvas>
}

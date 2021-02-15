import React from "react"
import "../css/BarChart.css"

function BarGroup({ xLabel, yLabel, barHeight = 30, value, maxValue }) {
  let barPadding = 2
  let barColour = "#348AA7"
  let widthScale = 1

  if (maxValue < 10000) {
    widthScale = 0.1
  } else if (maxValue < 100000) {
    widthScale = 0.015
  } else if (maxValue < 1000000) {
    widthScale = 0.005
  }
  let width = value * widthScale
  let yMid = barHeight * 0.5

  return (
    <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle">
        {yLabel}
      </text>
      <rect y={barPadding * 0.5} width={width} height={barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width - 8} y={yMid} alignmentBaseline="middle">
        {xLabel}
      </text>
    </g>
  )
}

export default function BarChart({ show, data, barHeight = 30 }) {
  if (!show) return null
  let maxValue = Math.max(...data.map((d) => d.daily_vaccinations))
  let barGroups = data.map((d, i) => (
    <g transform={`translate(0, ${i * barHeight})`}>
      {console.log("BarChart", d)}
      <BarGroup
        key={i}
        value={d.daily_vaccinations}
        xLabel={Number(d.daily_vaccinations)}
        yLabel={d.date}
        d={d}
        barHeight={barHeight}
        maxValue={maxValue}
      />
    </g>
  ))

  return (
    <svg width="1200" height="2600" viewBox="0 0 1200 2600">
      <g className="container">
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  )
}

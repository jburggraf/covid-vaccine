import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import data from "../data/us_state_vaccinations.csv"
import StateTable from "./StateTable"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BarChart from "./BarChart"

const TABLE_SHOW_MSG = "Show Table"
const TABLE_HIDE_MSG = "Hide Table"
const GRAPH_SHOW_MSG = "Show Graph"
const GRAPH_HIDE_MSG = "Hide Graph"

export default function App() {
  const [stateData, setStateData] = useState([])
  const [stateList, setStateList] = useState([])
  const [selectedStateData, setSelectedStateData] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [tableButtonMsg, setTableButtonMsg] = useState(TABLE_SHOW_MSG)
  const [showGraph, setShowGraph] = useState(false)
  const [graphButtonMsg, setGraphButtonMsg] = useState(GRAPH_SHOW_MSG)
  const [selectedState, setSelectedState] = useState("")
  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    d3.csv(data)
      .then(function (data) {
        setStateData(data)

        // pull out location property
        const temp = data.map((t) => t.location)
        // get unique values
        const uniqueList = temp.filter(function (item, pos) {
          return temp.indexOf(item) == pos
        })
        const newList = []
        uniqueList.forEach((el) => newList.push({ label: el, value: el }))
        console.log(newList)
        setStateList(newList)
      })
      .catch(function (err) {
        throw err
      })
  }, [])

  useEffect(() => {
    setSelectedStateData(stateData.filter((data) => data.location === selectedState))
  }, [selectedState])

  function handleShowTableClick() {
    setShowTable(!showTable)
    setTableButtonMsg(showTable ? TABLE_SHOW_MSG : TABLE_HIDE_MSG)
  }

  function handleShowGraphClick() {
    setShowGraph(!showGraph)
    setGraphButtonMsg(showGraph ? GRAPH_SHOW_MSG : GRAPH_HIDE_MSG)
  }

  function onChangeState(e) {
    setSelectedState(e.target.value)
  }

  return (
    <>
      <select onChange={onChangeState}>
        <option value="">Select a state</option>
        {stateList.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <p />
      <button onClick={handleShowTableClick}>{tableButtonMsg}</button>
      <button onClick={handleShowGraphClick}>{graphButtonMsg}</button>
      <StateTable show={showTable} stateData={selectedStateData} state={selectedState} />
      <BarChart show={showGraph} data={selectedStateData} />
    </>
  )
}

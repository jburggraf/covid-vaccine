import React from "react"
import MaterialTable from "material-table"
import "../css/StateTable.css"

export default function StateTable({ show, stateData }) {
  if (!show) return null
  console.log("stateData", stateData)
  const COLUMNS = [
    {
      title: "Location",
      field: "location",
    },
    {
      title: "Date",
      field: "date",
      defaultSort: "desc",
    },
    {
      title: "Vaccinations this day",
      render: (rowData) => Number(rowData.daily_vaccinations),
      customSort: (a, b) => a.daily_vaccinations - b.daily_vaccinations,
    },
    {
      title: "People fully vaccinated",
      render: (rowData) => Number(rowData.people_fully_vaccinated),
      customSort: (a, b) => a.people_fully_vaccinated - b.people_fully_vaccinated,
    },
    {
      title: "People with at least one vaccination",
      render: (rowData) => Number(rowData.people_vaccinated),
      customSort: (a, b) => a.people_vaccinated - b.people_vaccinated,
    },
  ]

  return (
    <>
      <MaterialTable
        title="Vaccines"
        data={stateData}
        columns={COLUMNS}
        options={{
          search: true,
          paging: false,
          filtering: false,
          exportButton: true,
        }}
      />
    </>
  )
}

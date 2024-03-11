import React, { useState, useEffect } from "react";
import "./EmployeeChart.css";
import { useFrappeGetDocCount } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

function EmployeeChartYear() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedLocation, setSelectedLocation] =
    useState("Open Workspace - 1 (Thaiyur)");
  const navigate = useNavigate();

  const formattedStartDate = `${selectedYear}-01-01`;
  const formattedEndDate = `${selectedYear}-12-31`;

  const { data: inTimeData, error: inTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", ">=", formattedStartDate],
      ["attendance_date", "<=", formattedEndDate],
      ["location", "=", selectedLocation],
      ["in_time", "!=", ""],
    ]
  );

  const { data: outTimeData, error: outTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", ">=", formattedStartDate],
      ["attendance_date", "<=", formattedEndDate],
      ["location", "=", selectedLocation],
      ["out_time", "!=", ""],
    ]
  );

  const inTimeCount = inTimeData || 0;
  const outTimeCount = outTimeData || 0;
  const presentEmployeeCount = inTimeCount - outTimeCount;

  const maxCount = Math.max(inTimeCount, outTimeCount, presentEmployeeCount);
  console.log(maxCount);

  const employeeInBarHeight =
    inTimeCount > 0 ? (inTimeCount * 100) / maxCount : 0;
  const employeeOutBarHeight =
    outTimeCount > 0 ? (outTimeCount * 100) / maxCount : 0;
  const presentEmployeeBarHeight =
    presentEmployeeCount > 0 ? (presentEmployeeCount * 100) / maxCount : 0;

  return (
    <div>
      <div
        className="date-selector"
        style={{
          padding: "10px",
          gap: "5px",
          display: "flex",
          backgroundColor: "white",
          borderRadius: "10px",
          margin: "10px",
        }}
      >
        <label htmlFor="year">Select Year: </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(Number(e.target.value));
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - 9 + i}>
              {new Date().getFullYear() - 9 + i}
            </option>
          ))}
        </select>
        <label htmlFor="location">Select Location: </label>
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
         <option value="Open Workspace - 1 (Thaiyur)">
                    Open Workspace - 1 (Thaiyur)
                  </option>
                  <option value="Open Workspace - 2">Open Workspace - 2</option>
                  <option value="Rocket Factory">Rocket Factory</option>
          {/* Add more location options as needed */}
        </select>
      </div>

      <div className="chart-container">
        <div className="chart-bar">
          <div className="bar-label">Employee In</div>
          <div
            className="inner-bar"
            style={{
              height: `${employeeInBarHeight}px`,
              backgroundColor: "green",
            }}
          >
            {employeeInBarHeight > 0 && <span>{inTimeCount}</span>}
          </div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Employee Out</div>
          <div
            className="inner-bar"
            style={{
              height: `${employeeOutBarHeight}px`,
              backgroundColor: "blue",
            }}
          >
            {employeeOutBarHeight > 0 && <span>{outTimeCount}</span>}
          </div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Present Employee</div>
          <div
            className="inner-bar"
            style={{
              height: `${presentEmployeeBarHeight}px`,
              backgroundColor: "orange",
            }}
          >
            {presentEmployeeBarHeight > 0 && (
              <span>{presentEmployeeCount}</span>
            )}
          </div>
        </div>
      </div>
      <label style={{ margin: "10px", fontSize: "45px" }}>Location </label>
    </div>
  );
}

export default EmployeeChartYear;
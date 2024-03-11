import React, { useState, useEffect } from "react";
import "./EmployeeChart.css";
import { useFrappeGetDocCount } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

export function EmployeeChartDays() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState("Open Workspace - 1 (Thaiyur)"); // Added location state
  const [inTimeCount, setInTimeCount] = useState(0);
  const [outTimeCount, setOutTimeCount] = useState(0);

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };

  const { data: inTimeData, error: inTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", "=", selectedDate],
      ["location", "=", selectedLocation], // Use selected location
      ["in_time", "!=", ""],
    ]
  );

  const { data: outTimeData, error: outTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", "=", selectedDate],
      ["location", "=", selectedLocation], // Use selected location
      ["out_time", "!=", ""],
    ]
  );

  useEffect(() => {
    if (inTimeData) {
      setInTimeCount(inTimeData);
    } else {
      setInTimeCount(0);
    }
    if (outTimeData) {
      setOutTimeCount(outTimeData);
    } else {
      setOutTimeCount(0);
    }
  }, [inTimeData, outTimeData]);

  const insideOfficeCount = inTimeCount - outTimeCount;
  const maxCount = Math.max(inTimeCount, outTimeCount, insideOfficeCount);
  console.log(maxCount);

  const inTimeBarHeight = ((inTimeCount * 100) / maxCount) * 5;
  const outTimeBarHeight = ((outTimeCount * 100) / maxCount) * 5;
  const insideOfficeBarHeight = ((insideOfficeCount * 100) / maxCount) * 5;

  const navigate = useNavigate();

  return (
    <div>
      <div className="date-input">
        <form>
          <div className="date-input-field">
            <div
              style={{
                width: "90%",
                padding: "10px",
                gap: "5px",
                display: "flex",
                backgroundColor: "white",
                borderRadius: "10px",
                margin: "10px",
              }}
            >
              <label>
                Select Date:
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </label>
              <label>
                Select Location: {/* Added Location Dropdown */}
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option value="Open Workspace - 1 (Thaiyur)">
                    Open Workspace - 1 (Thaiyur)
                  </option>
                  <option value="Open Workspace - 2">Open Workspace - 2</option>
                  <option value="Rocket Factory">Rocket Factory</option>
                  {/* Add more options as needed */}
                </select>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="chart-container">
        <div className="chart-bar">
          <div className="bar-label">In Count {inTimeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${inTimeBarHeight || 0}px`,
              backgroundColor: "green",
            }}
          ></div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Out Count {outTimeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${outTimeBarHeight || 0}px`,
              backgroundColor: "blue",
            }}
          ></div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Staying {insideOfficeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${insideOfficeBarHeight || 0}px`,
              backgroundColor: "orange",
            }}
          ></div>
        </div>
      </div>
      <label style={{ margin: "10px", fontSize: "45px" }}>Location </label>
    </div>
  );
}

export default EmployeeChartDays;
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { ImageList, ImageListItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { locateContext } from "./App";
import { useFrappeGetDocList } from "frappe-react-sdk";
import Container from "@mui/material/Container";
import { MyDocumentList } from "./Mydoclist";
import logo1 from "./assets/logo.png";
import logo2 from "./assets/logo.png";
import "./DataForm.css";


const MyForm: React.FC = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { formDataEmployee, setFormDataEmployee,Employee_Name, setEmployeeName }: any =
    useContext(locateContext);
  const showLabel = localStorage.getItem("isEntry") === "true";
  const [Employee_Id, setEmployeeId] = useState<string>("");
  

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataEmployee({
      ...formDataEmployee,
      [name]: value,
    });
  };

  useEffect(() => {
    // Initialize the QR code scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 450,
          height: 450,
        },
        fps: 10,
      },
      true
    );

    // Define success and error handlers
    function success(result: string) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err: any) {
      console.warn(err);
    }

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, []);

  const { data }: any = useFrappeGetDocList("Employee", {
    fields: ["image","id_card_image"],
    filters: [
      ["employee", "=", formDataEmployee.id],
      //   // ["user_name", "=", JSON.parse(localStorage.formdata)["name"]],
    ],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });

  let photo = data?.[0]?.image;
  let empid = data?.[0]?.id_card_image;
  console.log(photo);

  // Extract Employee ID and Name from the scan result
  const extractEmployeeInfo = (scanResult: string | null) => {
    if (!scanResult) return { id: "", name: "" };
    const parts = scanResult.split("/");
    const id = parts[1] || "";
    const name = parts[0] || "";

    //localstorage add pandrom
    localStorage.formdata = JSON.stringify({ name: name, id: id });

    return { id, name };
  };
  useEffect(() => {
    const { id: extractedId, name: extractedName } =
      extractEmployeeInfo(scanResult);
    setEmployeeId(extractedId);
    setEmployeeName(extractedName);

    setFormDataEmployee({
      ...formDataEmployee,
      id: extractedId,
      name: extractedName,
    });
  }, [scanResult]);
  let datastatus: any = MyDocumentList(localStorage, "Security Verification 2");
  let employeestatus: any = MyDocumentList(localStorage, "Employee");
  // console.log("employeestatus", employeestatus);
  let statusData = datastatus?.[0]?.status;
  let employeeData = employeestatus?.[0]?.status;
  //  console.log("employeeData", employeeData);
  // console.log("statusData", statusData);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inTime = getCurrentTime();

    console.log("Form submitted with data:", formDataEmployee);

    if (showLabel) {
      if (employeeData === "Active") {
        if (statusData === "Online") {
          alert("Please Exit first!");
          navigate("/welcomepage"); // Navigate to welcomepage
        } else {
          navigate("/LaptopVerification");
        }
      } else {
        alert("Employee not found");
        navigate("/welcomepage");
      }
    }
    if (!showLabel) {
      if (employeeData === "Active") {
        if (statusData === "Offline") {
          alert("Please Enter first!");
          navigate("/welcomepage"); // Navigate to welcomepage
        } else {
          navigate("/LaptopVerification");
        }
      } else {
        alert("Employee not found");
        navigate("/welcomepage");
      }
    }
  };
  // console.log(datastatus);

  // Get the current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Get the current date
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    setCurrentDate(formattedDate);
  }, []);

  return scanResult ? (
    <div className="background-container">
    <img src={logo1} alt="Logo" className="firstlogo"></img>
    <div className="scanner-container">
      <form onSubmit={handleSubmit} style={{ width: "23vw", height: "480" }}>
        <ImageList
          sx={{
            backgroundColor: "white",
            marginTop: "2vh",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
          cols={2}
        >
          <ImageListItem
            sx={{
              width: "48vw", // Set the width to 50% for 2 columns
              height: "55vh",
            }}
          >
            <img
              style={{ borderRadius: "10px" }}
              src={photo}
              alt="Employee Photo"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)"; // Increase size on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
              }}
            />
          </ImageListItem>
          <ImageListItem
            sx={{
              width: "48vw", // Set the width to 50% for 2 columns
              height: "55vh",
            }}
          >
            <img
              style={{ borderRadius: "10px" }}
              src={empid}
              alt="Employee Photo"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)"; // Increase size on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
              }}
            />
          </ImageListItem>
        </ImageList>

        
        <div style={{ marginBottom: "10px" }}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={Employee_Name}
            onChange={handleInputChange}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.10)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <TextField
            label="ID"
            variant="outlined"
            name="id"
            value={Employee_Id}
            onChange={handleInputChange}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.10)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <TextField
            label="Date"
            variant="outlined"
            name="date"
            value={currentDate}
            onChange={handleInputChange}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.10)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <TextField
            label={showLabel ? "In-Time" : "Out-Time"}
            variant="outlined"
            name={showLabel ? "inTime" : "outTime"}
            value={getCurrentTime()}
            onChange={handleInputChange}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.10)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px",padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px", fontFamily: 'Proxima Nova, sans-serif',fontWeight: "bold",}}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.10)"; // Increase size on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
          }}
        >
          Next
        </Button>
      </form>
    </div>
  </div>
) : (
  <div className="custom-reader-background">
    <img src={logo2} alt="Logo" className="secondlogo"></img>
    <div id="reader" className="custom-reader"></div>
  </div>
  );
};

export default MyForm;

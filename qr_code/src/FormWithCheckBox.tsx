//import { useState } from "react";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { locateContext } from "./App";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MultipleImageCapture } from "./MultipleImageCapture";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import "./FormWithCheckBox.css"
import configlogo from "./assets/configlogo.png";
import logo from "./assets/logo.png";

const FormWithCheckBox: React.FC = () => {
  const navigate = useNavigate();
  const {
    formDataCheckBox,
    setFormDataCheckBox,
    formDataLaptop,
    formDataEmployee,
    buttonClick,
    // currentDate,
    userFormImage,
    capturedImages,
    successCount,
    setSuccessCount,
  }: any = useContext(locateContext);

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;

    if (name === "selectAll") {
      setFormDataCheckBox({
        ...formDataCheckBox,
        Laptop:checked,
        Scissors: checked,
        pendrive: checked,
        hardDisk: checked,
      });
    } else {
      setFormDataCheckBox({
        ...formDataCheckBox,
        [name]: checked,
      });
    }
  };
  

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormDataCheckBox({
      ...formDataCheckBox,
      otherText: value,
    });
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted with data:", formDataCheckBox);
    handleCreateDoc();
    handleCreateAttendance();
    if (buttonClick.button === "True" ){
      handleUpdateLapDoc();
  }
    navigate("/ThankYouPage");
    setTimeout(() => {
      window.location.replace("/qr_code/WelcomePage");
    }, 3500);
  };

  const { createDoc } = useFrappeCreateDoc();
  const { updateDoc } = useFrappeUpdateDoc();

  const handleUpdateLapDoc = async () => {
    interface CapturedImage {
      id: number;
      imageSrc: string;
    }
  
    const verifyLaptop = {
      image: userFormImage.image,
    };
    
    try {
      await updateDoc(
        "Laptop Verify",`${formDataEmployee.id}`,
        verifyLaptop
      );
      
    } catch (error) {
      console.error("Error update doc......:", error);
    }
  };

  const handleCreateDoc = async () => {
    interface CapturedImage {
      id: number;
      imageSrc: string;
    }

    const formLaptop = {
      title: "d1", // Example title
     
      laptop_sr_no: formDataLaptop.laptopSerialNumber,
      brand: formDataLaptop.laptopBrand,
      location: formDataEmployee.location,
      employee_name: formDataEmployee.name,
      employee: formDataEmployee.id,
      time: getCurrentTime(),
      laptop_image: userFormImage.image,
      status: "Online",
      conf_list: Object.keys(formDataCheckBox)
        .filter(
          (item) =>
            item !== "otherText" && item !== "others" && formDataCheckBox[item]
        )
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .concat(formDataCheckBox.others ? [formDataCheckBox.otherText] : [])
        .join(", "),
      date: currentDate,

      image_list: capturedImages
        .map((item: CapturedImage) => item.imageSrc)
        .join("|lak|"),
    };
    console.log("Capture", capturedImages);
    console.log("formLaptop", formLaptop);
    try {
      await createDoc("Security Verification 2", formLaptop);
      console.log("Created Successfully");
    } catch (error) {
      console.error("Error creating doc......:", error);
    }
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
    return () => {
      selectNone();
    };
  }, []);
console.log("laptop location last",formDataLaptop.laptopLocation)
  //create docytype
  const handleCreateAttendance = async () => {
    const formAttendance = {
      title: "d1", // Example title
      // name: userForm.user_name,
      employee: formDataEmployee.id,
      employee_name: formDataEmployee.name,
      attendance_date: currentDate,
      in_time: getCurrentTime(),
      employee_id: formDataEmployee.id,
      location: formDataEmployee.location,
    };
    console.log(currentDate);
    try {
      await createDoc("Attendance", formAttendance);
      console.log("Created Successfully attendance");
      setSuccessCount((prevCount: number) => prevCount + 1); // Increase count on successful creation

      console.log("count", successCount);
    } catch (error) {
      console.error("Error creating doc:", error);
    }
  };
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const selectNone = () => {
    setFormDataCheckBox({
      Laptop:false,
      Scissors: false,
      pendrive: false,
      hardDisk: false,
      others: false,
      otherText: "",
    });
  };
  const isAtLeastOneCheckboxSelected =
  formDataCheckBox.Laptop ||
  formDataCheckBox.Scissors ||
  formDataCheckBox.pendrive ||
  formDataCheckBox.hardDisk ||
  formDataCheckBox.others;

  return (
  <div className="container">
<img src={logo} alt="Logo" className="formlogo"></img>
<img src={configlogo} alt="Logo" className="configformlogo"></img>
    <form className="confi" onSubmit={handleSubmit}>
      
    {isAtLeastOneCheckboxSelected && (
        <div>
          <MultipleImageCapture />
        </div>
      )}
        <FormGroup>
          <h2>
        <b>Confiscated Items:</b>
      </h2>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  formDataCheckBox.Laptop &&
                  formDataCheckBox.Scissors &&
                  formDataCheckBox.pendrive &&
                  formDataCheckBox.hardDisk &&
                  formDataCheckBox.others
                }
                onChange={handleCheckboxChange}
                name="selectAll"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.30)"; // Increase size on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
                }}
              />
            }
            label="Select All"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.Laptop}
                onChange={handleCheckboxChange}
                name="Laptop"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.30)"; // Increase size on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
                }}
              />
            }
            label="Laptop"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.Scissors}
                onChange={handleCheckboxChange}
                name="Scissors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.30)"; // Increase size on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
                }}
              />
            }
            label="Scissors"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.pendrive}
                onChange={handleCheckboxChange}
                name="pendrive"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.30)"; // Increase size on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
                }}
              />
            }
            label="Pendrive"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.hardDisk}
                onChange={handleCheckboxChange}
                name="hardDisk"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.30)"; // Increase size on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
                }}
              />
            }
            label="Hard Disk"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />


          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.others}
                onChange={handleCheckboxChange}
                name="others"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.30)"; // Increase size on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
                }}
              />
            }
            label="Others"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  !formDataCheckBox.Scissors &&
                  !formDataCheckBox.pendrive &&
                  !formDataCheckBox.hardDisk &&
                  !formDataCheckBox.Laptop &&
                  !formDataCheckBox.others
                }
                onChange={selectNone}
                name="none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.30)"; // Increase size on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
                }}
              />
            }
            label="None"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
        </FormGroup>

        {formDataCheckBox.others && (
          <TextField
            label="Other Items"
            variant="outlined"
            name="otherText"
            value={formDataCheckBox.otherText}
            onChange={handleOtherTextChange}
            // style={{ marginTop: "16px" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          style={{marginTop:"16px",padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         flexDirection: "column",
         fontFamily: "Proxima Nova",
            fontSize:"bold"
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
          }}
        >
          Submit
        </Button>
      </form>
      </div>

  );
};

export default FormWithCheckBox;

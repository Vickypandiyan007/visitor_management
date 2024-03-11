import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { locateContext } from "./App";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFrappeDeleteDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { motion } from "framer-motion";
import { Snackbar, CircularProgress } from '@mui/material';
import SnackbarContent from "@mui/material/SnackbarContent";
import { Alert } from '@mui/material';
import "./LaptopVerification.css";
import nolap from "./assets/nolap.png";
import logo from "./assets/agnikulLogo.png";

export function LaptopVerification() {
  const showLabel = localStorage.getItem("isEntry") === "true";

  const {
    userFormImage, setUserFormImage, buttonClick, setButtonClick, formDataEmployee, setFormDataEmployee
  }: any = useContext(locateContext);
  const [isLocationSelected, setIsLocationSelected] = useState(false); // State variable to track location selection
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataLaptop({
      ...formDataLaptop,
      [name]: value,
    });
    setFormDataEmployee({
      ...formDataEmployee,
      [name]: value,
    });
    setIsLocationSelected(true);
  };
  const navigate = useNavigate();
  const { formDataLaptop, setFormDataLaptop }: any = useContext(locateContext);




  const { data }: any = useFrappeGetDocList("Laptop Verify", {
    fields: ["image"],
    filters: [
      ["id", "=", formDataEmployee.id],
      //   // ["user_name", "=", JSON.parse(localStorage.formdata)["name"]],
    ],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });
  console.log(formDataEmployee.location)



  return (
    <div>
      
      <div
        className="laphead"
        style={{
          backgroundColor: "white",
          width: "64vw",
          height: "74vh",
          borderRadius: "10px",
          padding: "5px",
          boxShadow: "0 0 20px rgba(8, 7, 16, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      >
        <img src={logo} alt="Logo" className="logo3"></img>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <div className="lap"
            onClick={() => {
              if (showLabel ) {
                if(isLocationSelected){
                    if (data.length > 0) {
                      showSnackbar('Laptop already exists.');
                    } else {
                      setUserFormImage({ ...userFormImage, laptopstatus: "In" });
                      setButtonClick({ ...buttonClick, button: "True" });
                      navigate("/LaptopDetails");
                    } // Navigate to welcomepage if both conditions are met
                  }else{
                    showSnackbar('Please Select location');
                  }
              }
              if (!showLabel) {
                if (data.length > 0) {
                  setUserFormImage({ ...userFormImage, laptopstatus: "Out" });
                  navigate("/ExitCheckBox");
                  setButtonClick({ ...buttonClick, button: "True" });
                } else {
                  showSnackbar('No Laptop Available');
                }
                // Navigate to welcomepage
              }
            }}
            style={{
              backgroundColor: "white",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "23vw",
              height: "auto",
              borderRadius: "10px",
              // marginTop: "80px",
              // boxShadow: "0 0 2px rgba(8, 7, 16, 0.6)",
              display: "flex",
              justifyContent: "up",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              transition: "transform 0.25s ease-in-out",
              flexDirection: "column",
              fontFamily:"'Proxima Nova, sans-serif'",
              
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >
            Laptop
          </div>

          <div className="nolapdiv"
            onClick={() => {
              if (showLabel) {
                if (isLocationSelected){
                navigate("/formwithcheckbox");
                 // Navigate to welcomepage
                }else{
                  showSnackbar('Please Select location');
                }
              }
              if (!showLabel) {
                navigate("/exitcheckbox"); // Navigate to welcomepage
              }
            }}
            style={{
               
              backgroundColor: "white",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "23vw",
              height: "auto",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "up",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              transition: "transform 0.25s ease-in-out",
              flexDirection: "column",
              fontFamily:"'Proxima Nova, sans-serif'"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >
            No Laptop
            <img src={nolap} alt="nolapLogo" className="nolap"></img>
          </div>
        </div>
         {showLabel && (
          <div className="lapbutton" >
            <FormControl variant="outlined" style={{ marginTop: "3rem", display: "flex", }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
              }}
            >
              <InputLabel htmlFor="location">Location</InputLabel>
              <Select
                label="Location"
                name="location"
                value={formDataEmployee.location}
                onChange={handleChange}
                required // Add the required attribute to the Select component
                style={{  width: "15vw", height: "5.5vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",fontFamily:"'Proxima Nova, sans-serif'" ,fontWeight:"bold"}}
              >
                <MenuItem value="">
                  <em>Select Location</em>
                </MenuItem>
                <MenuItem sx={{fontFamily:"'Proxima Nova, sans-serif'",fontWeight:"bold"}} value={"Open Workspace - 1 (Thaiyur)"}>Open Workspace - 1(Thaiyur)</MenuItem>
                <MenuItem sx={{fontFamily:"'Proxima Nova, sans-serif'",fontWeight:"bold"}}value={"Open Workspace - 2"}>Open Workspace - 2</MenuItem>
                <MenuItem sx={{fontFamily:"'Proxima Nova, sans-serif'",fontWeight:"bold"}}value={"Rocket Factory"}>Rocket Factory</MenuItem>
                <MenuItem sx={{fontFamily:"'Proxima Nova, sans-serif'",fontWeight:"bold"}}value={"SHAR"}>SHAR</MenuItem>
              </Select>
            </FormControl>
          </div>
        )} 
      </div> 
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}


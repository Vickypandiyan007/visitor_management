
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { locateContext } from "./App";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import logo from "./assets/agnikulLogo.png";
import Entry from "./assets/entryillustrator.png";
import "./WelcomePage.css";
import btnlogo from "./assets/widgets.png";



export function WelcomePage() {
  const { setShowLabel }: any = useContext(locateContext);

  const navigate = useNavigate();
  const handleEntryClick = () => {
    setShowLabel(true);
    localStorage.setItem("isEntry", "true");
    navigate("/post");
  };
  const handleLogout = () => {
    localStorage.removeItem("isEntry"); // Remove the 'isEntry' flag to indicate logout
    navigate("/SecurityLogin"); // Navigate to the SecurityLogin page
  };

  const handleExitClick = () => {
    setShowLabel(false);
    localStorage.setItem("isEntry", "false");
    navigate("/post");
  };
  const handleDashboardClick = () => {
    navigate("/EmployeeCompleteChart");
  };

  return (
    
    <div>
      <div
        className="welcome-container"
        style={{
          backgroundColor: "white",

          width: "64vw",
          height: "72vh",
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
        <div>
          <img
  
    style={{
      position: "absolute",
      top:"15vh",
      left: "18vw",
      height:'auto',
      maxWidth: "7vw"
    }}
            src={logo}
          />
          {/* <Button
            className="button1"
            type="submit"
            variant="contained"
            style={{
              position: "absolute",
              top: "15vh",
              right: "20vw",
              fontWeight:"bold",
              height: "auto",
              padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",
              marginTop: "16px",
              fontFamily: 'Proxima Nova, sans-serif',
            }}
            onClick={() => {
              window.location.replace("/qr_code/EmployeeCompleteChart");
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >

            <span className="btnlogo">
              <img src={btnlogo} alt="btnlogo" />
            </span>
            Dashboard
          </Button> */}
          <div>
          <p className="welcome-message">Welcome to Agnikul</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            color: "black",
          }}
        >
          <div
            className="Entry"
            onClick={() => {
              handleEntryClick();
              navigate("/post");
            }}
            style={{
              backgroundColor: "white",
              boxShadow: "0 0 1px rgba(8, 7, 16, 0.6)",
              width: "25vw",
              height: "30vh",
              borderRadius: "10px",
              padding: "2%",
              display: "flex",
              justifyContent: "up",
              alignItems: "center",
              fontWeight: "700",
              fontSize: "20px",
              cursor: "pointer",
              flexDirection: "column",
              fontFamily: 'Proxima Nova, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >
            Entry
          </div>
          <div
            className="Exit"
            onClick={() => {
              handleExitClick();
              navigate("/post");
            }}
            style={{
              backgroundColor: "white",
              boxShadow: "0 0 1px rgba(8, 7, 16, 0.6)",
              width: "25vw",
              height: "30vh",
              borderRadius: "10px",
              padding: "2%",
              display: "flex",
              justifyContent: "up",
              alignItems: "center",
              fontWeight: "700",
              fontSize: "20px",
              cursor: "pointer",
              flexDirection: "column",
              fontFamily: 'Proxima Nova',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >
            Exit
          </div>
        </div>
        <div>
          <Button
            className="button"
            type="submit"
            variant="contained"
            style={{ marginTop: "50px",padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px" ,fontWeight:"bold"}}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
            
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
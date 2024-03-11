import { Button } from "@mui/material";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import "./AdditionalLaptop.css";
import { useContext } from "react";
import { locateContext } from "./App";
import { useEffect } from "react";
import { Snackbar, CircularProgress } from '@mui/material';
import logo from "./assets/agnikulLogo.png";

const videoConstraints = {
  width: 20,
  height: 20,
  facingMode: "user",
};

export const AdditionalLaptop: React.FC = () => {
  const {
    formDataEmployee,
  }: any = useContext(locateContext);
  const [capturedImages, setCapturedImages] = useState<any[]>([]);
  const [captureCount, setCaptureCount] = useState(0);
  const webcamRef = useRef<Webcam>(null);
  const [letterPermission, setLetterPermission] = useState(false);

  const handleLetterPermission = () => {
    setLetterPermission(!letterPermission); // Update the state to reflect permission with the letter
  };
  const navigate = useNavigate();
    const handleNoPermission = () => {
      // Navigate to Laptopdetails.tsx when "No Permission" button is clicked
      navigate("/FormWithCheckBox");
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

    function getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    const [currentDate, setCurrentDate] = useState("");


    useEffect(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
  
      const formattedDate = `${day}-${month}-${year}`;
      setCurrentDate(formattedDate);
    }, []);


  const capture = useCallback(() => {

    if (webcamRef.current ) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages([
        ...capturedImages,
        {
          id: captureCount,
          imageSrc: imageSrc || "",
        },
      ]);
      setCaptureCount(captureCount + 1);
    }
  }, [capturedImages, captureCount,]);

  const retake = () => {
    if (capturedImages.length > 0) {
      const updatedImages = [...capturedImages];
      updatedImages.pop(); // Remove the last captured image
      setCapturedImages(updatedImages);
      setCaptureCount(captureCount - 1); // Decrement captureCount
    }
  };

  console.log("capture", capturedImages);

  const handleSubmit = async () => {
    try {
      await handleCreateDoc();
      navigate("/FormWithCheckBox");
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  const { createDoc } = useFrappeCreateDoc();
 
  const handleCreateDoc = async () => {
    interface CapturedImage {
      id: number;
      imageSrc: string;
    }

    const formAdditionalLaptop = {
      id:formDataEmployee.id,
      imagesrc: capturedImages
        .map((item: CapturedImage) => item.imageSrc)
        .join("|lak|"),
        date:currentDate,
        time:getCurrentTime(),
    };


  

    console.log("Capture", capturedImages);
    try {
      await createDoc("Additional Laptop", formAdditionalLaptop);
      console.log("Created Successfully Additional Laptop");
    } catch (error) {
      console.error("Error creating doc......:", error);
    }
  };

  console.log("additional,letter",);
  return (
    <div >
      <form className="webcam-container-add">
      <img src={logo} alt="Logo" className="logo1"></img>
      <div className="webcam-img">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{width:"35vh",display: "flex",
          justifyContent: "center",
          alignItems: "center",flexDirection:"column"}}
          videoConstraints={videoConstraints}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "2%",
          gap: "5%",
        }}
      >
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
            disabled={!letterPermission}
            style={{width:"100%",padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",fontFamily:"'Proxima Nova', sans-serif",
            fontWeight:"bold",height:"fit-content" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >
            Capture Image {captureCount}
          </button>
        
        {capturedImages.length > 0 && (
            <button type = "button" style={{padding:"8px 12px",backgroundColor: "#2D5831",borderRadius: "10px",}} onClick={retake} className="webcam-btn">
              Retake
            </button>
        )}
      </div>
      <div 
      style = {{
       display: "flex",
       flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
       gap: "10px",}}
      >
          <Button
            onClick={handleLetterPermission}
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem",padding:"8px 15px",
            backgroundColor: letterPermission ? "#2D5831" : "white",
            color: letterPermission ? "white" : "#2D5831",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",fontFamily:"'Proxima Nova', sans-serif",
            fontWeight:"bold",  }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >
            Permission with Letter
          </Button>
          <Button
            onClick={handleNoPermission}
            variant="contained"
            color="primary"
            style={{
              marginTop: "1rem",
              padding: "8px 15px",
              backgroundColor: !letterPermission ? "#2D5831" : "white",
              color: !letterPermission ? "white" : "#2D5831",
              borderRadius: "10px",
              display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",fontFamily:"'Proxima Nova', sans-serif",
            fontWeight:"bold", 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
            }}
          >
            No Permission
          </Button>
      </div>
      <div style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",
      justifyContent:"center"}}>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        disabled={capturedImages.length === 0}
        style={{ marginTop: "1rem",padding:"8px 15px",
        backgroundColor: capturedImages.length > 0 ? "#2D5831" : "white",
        color: capturedImages.length > 0 ? "white" : "black",
        borderRadius: "10px", fontFamily:"'Proxima Nova', sans-serif",
        fontWeight:"bold", }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
        }}
      >
        Submit
      </Button>
      </div>
      </form>
    </div>
  );
};
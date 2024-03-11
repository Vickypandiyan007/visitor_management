import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

import { useContext } from "react";
import { locateContext } from "./App";

const videoConstraints = {
  width: 20,
  height: 20,
  facingMode: "user",
};

export const MultipleImageCapture: React.FC = () => {
  const { capturedImages, setCapturedImages }: any = useContext(locateContext);
  const [captureCount, setCaptureCount] = useState(0);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages([
        ...capturedImages,
        { id: captureCount, imageSrc: imageSrc || "" },
      ]);
      setCaptureCount(captureCount + 1);
    }
  }, [capturedImages, captureCount]);

  const retake = () => {
    if (capturedImages.length > 0) {
      const updatedImages = [...capturedImages];
      updatedImages.pop(); // Remove the last captured image
      setCapturedImages(updatedImages);
      setCaptureCount(captureCount - 1); // Decrement captureCount
    }
  };

  console.log(capturedImages);
  return (
    <div className="webcam-container">
      <div className="webcam-img1">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{borderRadius:"10px",
          width:"30vh",display: "flex",
          justifyContent: "center",
          alignItems: "center",flexDirection:"column"
        }}
        />
      </div>
      <div
        style={{
          display: "flex",
          padding: "2%",
          gap: "0%",
          justifyContent: "space-evenly",
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
          style={{padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",color:"white",fontFamily:"'Proxima Nova', sans-serif",
          fontWeight:"bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         flexDirection: "column",}}
          className="webcam-btn"
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
          <button onClick={retake} style={{padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",color:"white",fontFamily:"'Proxima Nova', sans-serif",
          fontWeight:"bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         flexDirection: "column",}} className="webcam-btn"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
          }}
          >
            Retake
          </button>
        )}
      </div>
    </div>
  );
};
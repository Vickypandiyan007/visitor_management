// import { useRef } from "react";

// // import { useNavigate } from "react-router-dom";
// import { useCallback } from "react";
// import Webcam from "react-webcam";
// import { useContext } from "react";
// import { locateContext } from "./App";
// const videoConstraints = {
//   width: 220,
//   height: 200,
//   facingMode: "user",
// };
// export const WebcamCapture = () => {
//   const { userFormImage, setUserFormImage, imageCaptured, setImageCaptured }: any = useContext(locateContext);
//   console.log(userFormImage.image);
//   const webcamRef = useRef<Webcam>(null);
//   // const navigate = useNavigate();
//   const capture = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc: any = webcamRef.current.getScreenshot();
//       setUserFormImage({ ...userFormImage, image: imageSrc });
//       setImageCaptured(1);
//     }
//   }, []);

//   return (
//     <div className="webcam-container">
//       <div
//         className="webcam-img"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
//           width: "500px",
//           height: "500px",
//           backgroundColor: "white",
//           // borderRadius: "50px",
//         }}
//       >
//         {userFormImage.image === null ? (
//           <Webcam
//             audio={false}
//             height={350}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width={350}
//             videoConstraints={videoConstraints}
//           />
//         ) : (
//           <img
//             style={{
//               width: "350px",
//               height: "350px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               background: "white",
//               gap: "10px",
//             }}
//             src={userFormImage.image}
//             alt="Captured"
//           />
//         )}
//       </div>
//       <div>
//         {userFormImage.image !== null ? (
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setUserFormImage({ ...userFormImage, image: null });
//               setImageCaptured(0);
//             }}
//             className="webcam-btn"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginLeft: "420px",
//               padding: "20px",
//               marginTop: "20px",
//             }}
//           >
//             Retake Image
//           </button>
//         ) : (
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               capture();
//             }}
//             className="webcam-btn"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginLeft: "420px",
//               padding: "20px",
//               marginTop: "20px",
//             }}
//           >
//             Capture
//           </button>
//         )}
//         {/* <button
//           onClick={() => {
//             navigate("/ThankyouPage");
//           }}
//           className="webcam-btn"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginLeft: "720px",
//           }}
//         >
//           Next
//         </button> */}
//       </div>
//     </div>
//     // </div>
//   );
// };


import { useRef } from "react";
import { useFrappeCreateDoc, useFrappeUpdateDoc } from "frappe-react-sdk";
// import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Webcam from "react-webcam";
import { useContext } from "react";
import { locateContext } from "./App";
import "./WebcamCapture.css";

const videoConstraints = {
  width: 220,
  height: 200,
  borderRadius: "50px",
  facingMode: "user",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const WebcamCapture = () => {
  const { userFormImage, setUserFormImage,formDataEmployee, imageCaptured,setImageCaptured}: any = useContext(locateContext);
  console.log(userFormImage.image);
  const webcamRef = useRef<Webcam>(null);
  // const navigate = useNavigate();
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc: any = webcamRef.current.getScreenshot();
      setUserFormImage({ ...userFormImage, image: imageSrc });
      setImageCaptured(1);
    }
  }, []);


  return (
    <div>
    <div className="webcam-container-lap">
      <div
        className="webcam-img">
        {userFormImage.image === null ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{width:"38vh",display: "flex",
            justifyContent: "center",
            alignItems: "center",flexDirection:"column"}}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img
            style={{
              width: "20vw",
              height: "35vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              flexDirection: "column",
            }}
            src={userFormImage.image}
            alt="Captured"
          />
        )}
      </div>
      <div>
        {userFormImage.image !== null ? (
          <button
          style={{padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",}}
            onClick={(e) => {
              e.preventDefault();
              setUserFormImage({ ...userFormImage, image: null });
              setImageCaptured(0);
            }}
            className="webcam-btn retake">
            Retake Image
          </button>
        ) : (
          <button
          style={{padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",}}
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn capture">
            Capture
          </button>
        )}
      </div>
    </div>
   </div>

  );
};
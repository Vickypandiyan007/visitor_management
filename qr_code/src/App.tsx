import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyForm from "./DataForm";
// import Test from "./QrReader";
import LaptopDetails from "./LaptopDetails";
import { WebcamCapture } from "./WebCamCapture";
import FormWithCheckBox from "./FormWithCheckBox";
import { ThankYouPage } from "./ThankYouPage";
import { WelcomePage } from "./WelcomePage";
import ExitCheckBox from "./ExitCheckBox";
import { ThankYouExit } from "./ThankYouExit.tsx";
import { SecurityLogin } from "./SecurityLogin";
import StandardListImage from "./StandardListImage";
import { MultipleImageCapture } from "./MultipleImageCapture";
import { createContext, useContext, useState } from "react";
import Notifiction from "./Notification"
import  EmployeeChart  from "./EmployeeChart.tsx";
import {LaptopVerification }from "./LaptopVerification.tsx"
import { AdditionalLaptop } from "./AdditionalLaptop.tsx";
import { EmployeeCompleteChart } from "./EmployeeCompleteChart.tsx";

// import { StandardListImageExit } from "./StandardListImageExit";

export const locateContext = createContext({});

function App() {
  localStorage.formdata;
  const [showLabel, setShowLabel] = useState(true);
  const [formDataLaptop, setFormDataLaptop] = useState({
    laptopBrand: "",
    laptopSerialNumber: "",
    laptopLocation: "",
    laptopImage: "",
  });

  const [userFormImage, setUserFormImage] = useState({
    image: null,
    laptopstatus: null,
  });

  const [buttonClick, setButtonClick] = useState({
    button: null,
  });

  const [imageCaptured, setImageCaptured] = useState(0);

  const [formDataEmployee, setFormDataEmployee] = useState({
    name: "",
    id: "",
    laptopSerialNumber: "",
    inTime: "",
    status:"",
    location:"",
  });

  const [Employee_Name, setEmployeeName] = useState<string>("");

  const [formDataCheckBox, setFormDataCheckBox] = useState({
    Scissors: false,
    Laptop:false,
    pendrive: false,
    hardDisk: false,
    others: false,
    otherText: "",
  });
  interface CapturedImage {
    id: number;
    imageSrc?: string | null;
  }
  const [currentDate, setCurrentDate] = useState("");
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [successCount, setSuccessCount] = useState<number>(0);
  

  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      <locateContext.Provider
        value={{
          formDataLaptop: formDataLaptop,
          setFormDataLaptop: setFormDataLaptop,
          userFormImage: userFormImage,
          setUserFormImage: setUserFormImage,
          formDataEmployee: formDataEmployee,
          setFormDataEmployee: setFormDataEmployee,
          formDataCheckBox: formDataCheckBox,
          setFormDataCheckBox: setFormDataCheckBox,
          currentDate: currentDate,
          setCurrentDate: setCurrentDate,
          showLabel: showLabel,
          setShowLabel: setShowLabel,
          capturedImages: capturedImages,
          setCapturedImages: setCapturedImages,
          successCount:successCount,
          setSuccessCount:setSuccessCount,
          imageCaptured:imageCaptured,
          setImageCaptured:setImageCaptured,
          Employee_Name: Employee_Name,
          setEmployeeName: setEmployeeName,
          buttonClick:buttonClick,
          setButtonClick:setButtonClick,
          //  extractEmployeeInfo :extractEmployeeInfo ,
        }}
      >
        <Routes>
          {/* <Route path="/get" element={<GetData />} /> */}
          <Route path="/" element={<SecurityLogin />} />
          <Route path="/post" element={<MyForm />} />
          {/* <Route path="/QrReader" element={<Test />} /> */}
          <Route path="/LaptopDetails" element={<LaptopDetails />} />
          <Route path="/FormWithCheckBox" element={<FormWithCheckBox />} />
          <Route path="/ThankYouPage" element={<ThankYouPage />} />
          <Route path="/WebCamCapture" element={<WebcamCapture />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route path="/ExitCheckBox" element={<ExitCheckBox />} />
          <Route path="/ThankYouExit" element={<ThankYouExit />} />
          <Route path="/SecurityLogin" element={<SecurityLogin />} />
          <Route path="/StandardListImage" element={<StandardListImage />} />
          <Route path="/Notification" element={<Notifiction />} />
          <Route path="/EmployeeChart" element={<EmployeeChart />} />
          <Route path="/EmployeeCompleteChart" element={<EmployeeCompleteChart />} />
          <Route path="/LaptopVerification" element={<LaptopVerification />} />
         <Route path="/AdditionalLaptop" element={<AdditionalLaptop/>}/>

          {/* <Route path="/StandardListImageExit" element={<StandardListImageExit />} /> */}
          <Route
            path="/MultipleImageCapture"
            element={<MultipleImageCapture />}
          />
        </Routes>
      </locateContext.Provider>
    </BrowserRouter>
  );
}
export default App;

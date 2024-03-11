import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { locateContext } from "./App";
import { useFrappeCreateDoc,useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { WebcamCapture } from "./WebCamCapture";
import { useState } from "react";
import StandardListImage from "./StandardListImage";
import "./LaptopDetails.css";
import logo from "./assets/agnikulLogo.png";

const LaptopDetails = () => {
  const { formDataLaptop, setFormDataLaptop, formDataEmployee, imageCaptured,userFormImage }: any =
    useContext(locateContext);
  const navigate = useNavigate();


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataLaptop({
      ...formDataLaptop,
      [name]: value,
    });
  };
  console.log("location",formDataLaptop.laptopLocation)

  const handleSubmit = (e: any,nextPage:string) => {
    e.preventDefault();
    if (imageCaptured === 1) {
      // Navigate to the next page when an image is captured
      if (nextPage === "/FormWithCheckbox") {
        handleCreateDoc();
        navigate("/FormWithCheckbox");
      } else if (nextPage === "/AdditionalLaptop") {
        handleCreateDoc();
        navigate("/AdditionalLaptop");
      }
    }
    console.log("Form submitted with data:", formDataLaptop);
  };

  const { createDoc } = useFrappeCreateDoc();
  const handleCreateDoc = async () => {
    interface CapturedImage {
      id: number;
      imageSrc: string;
    }

  const formSamplap = {
    id:formDataEmployee.id,
    image: userFormImage.image,
  };
  console.log("phtoto",userFormImage.image)

    try {
      await createDoc("Laptop Verify", formSamplap);
      console.log("Created Successfully");
    } catch (error) {
      console.error("Error creating doc......:", error);
    }  
}
  console.log("photo",userFormImage.image)

  const { data } = useFrappeGetDocList("Employee", {
    fields: ["laptop_sr_no", "brand"],
    filters: [["employee", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });

  useEffect(() => {
    setFormDataLaptop({
      laptopSerialNumber: data?.[0].laptop_sr_no || "",
      laptopBrand: data?.[0].brand || "",
      // laptopLocation: data?.[0].location || "",
      laptopImage: data?.[0].bio || "",
      Employee_Id: formDataEmployee.id,
    });
  }, [data]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
 

    <div className="lappage" >
      <img src={logo} alt="Logo" className="logo" 
      style={{position: "absolute",
      maxWidth:"5vw",
      height: "auto",
      top: "0%",
      left: "0%",
      display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
      }}>
      </img>
      <div>
      <Button
          type="submit"
          variant="contained"
          className="second-laptop-btn"
          style={{marginTop:"20px",
          backgroundColor: imageCaptured === 1 ? "#2D5831" : "white",borderRadius: "5px",padding:"6px 10px",color:imageCaptured === 1 ? "white" : "#2D5831",borderColor: imageCaptured === 1 ? "white" : "#2D5831",borderStyle: "solid", 
          borderWidth: "1px",
          margin:"10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily:"'Proxima Nova', sans-serif",
          fontWeight:"bold",        
        }}
           disabled={imageCaptured !== 1}
          onClick={(e) => handleSubmit(e,"/AdditionalLaptop")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
          }}
        >
          Second Laptop
        </Button>
      </div>
   <div className="WebStand" >
       
        <WebcamCapture />
        <StandardListImage />
        </div>
    
    <form className="form" onSubmit={(e) => handleSubmit (e, "/FormWithCheckbox")}>
      
      <div>
      <div style={{ marginTop: "30px", }}>
        <TextField
          label="Laptop Brand"
          variant="outlined"
          name="laptopBrand"
          value={formDataLaptop.laptopBrand}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "20px", }}>
        <TextField
          label="Laptop Serial Number"
          variant="outlined"
          name="laptopSerialNumber"
          value={formDataLaptop.laptopSerialNumber}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginTop: "1rem",}}>
        <Button
          type="submit"
          variant="contained"
          style={{marginTop:"5px",backgroundColor: imageCaptured === 1 ? "#2D5831" : "white",borderRadius: "5px",padding:"6px 15px",color:imageCaptured === 1 ? "white" : "#2D5831",borderColor: imageCaptured === 1 ? "white" : "#2D5831",borderStyle: "solid", fontFamily:"'Proxima Nova', sans-serif",
          fontWeight:"bold", 
          borderWidth: "1px",}}
          disabled={imageCaptured !== 1}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.10)"; // Increase size on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
          }}
        >
          Next
        </Button>
        
        </div>
      </div>
    </form>
    </div>

  );
};

export default LaptopDetails;

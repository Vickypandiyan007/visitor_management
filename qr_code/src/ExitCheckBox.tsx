import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { locateContext } from "./App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFrappeGetDocList,useFrappeDeleteDoc } from "frappe-react-sdk";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./ExitCheckBox.css";
import pic from "./assets/lna.png";
import pic1 from "./assets/nocon.png"
import logo from "./assets/agnikulLogo.png";

function parseTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

const ExitCheckBox = () => {
  const navigate = useNavigate();
  const {
    formDataCheckBox,
    setFormDataCheckBox,
    formDataLaptop,
    formDataEmployee,
    buttonClick,
   
  }: any = useContext(locateContext);

  const handleOtherTextChange = (e: any) => {
    const { value } = e.target;
    setFormDataCheckBox({
      ...formDataCheckBox,
      otherText: value,
    });
  };

  const {deleteDoc} = useFrappeDeleteDoc();
    const handleDeleteDoc = async () => {
      try {
        await deleteDoc("Laptop Verify",formDataEmployee.id);
        console.log("Deleted Successfully laptop");
  
      } catch (error) {
        console.error("Error deleteing doc:", error);
      }
  
    }

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted with data:", formDataCheckBox);
    console.log("itemsarray", itemsArray?.[0] === "");
    // handleCreateDoc();//callpandrom crete agurathuku
    handleUpdateDoc();
    handleUpdateConficatedItems();
    if (buttonClick.button === "True"){
      handleDeleteDoc();
    }
    navigate("/ThankYouExit");
    setTimeout(() => {
      window.location.replace("/qr_code/WelcomePage");
    }, 3500);
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    setCurrentDate(formattedDate);
  }, []);

  //update attendance

  const { updateDoc } = useFrappeUpdateDoc();
  const handleUpdateDoc = async () => {
    const outTime = getCurrentTime(); // Get the current time here
    const workingHoursInMinutes = calculateWorkingHours(inTime, outTime);
    const Attendanceupdate = {
      out_time: outTime,
      working_hours: workingHoursInMinutes,
      out_time_date:currentDate,
    };
    try {
      await updateDoc(
        "Attendance",
        `${formDataEmployee.id}-${AttendanceDate}-${inTime}`,
        Attendanceupdate
      );
      console.log("Attendance Updated Successfully");
      console.log("Working Hours:", workingHoursInMinutes);
      console.log("inTime:", inTime);
      console.log("outTime:", outTime);
    } catch (error) {
      console.error("Error update doc......:", error);
    }
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function calculateWorkingHours(inTime: string, outTime: string): number {
    const inTimeDate = parseTime(inTime);
    const outTimeDate = parseTime(outTime);
    const timeDifferenceMs = outTimeDate.getTime() - inTimeDate.getTime();
    const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);
    if(timeDifferenceMinutes < 0) {
      //Adjust working hours across midnight
      return (24 + ((timeDifferenceMinutes) / 60))
    } else {
      return timeDifferenceMinutes / 60;
    }
  }

  const { data }: any = useFrappeGetDocList("Security Verification 2", {
    fields: [
      "conf_list",
      "image_list",
      "date",
      "location",
      "time",
      "laptop_image",
      "status",
    ],
    filters: [
      ["employee", "=", formDataEmployee.id],
      // ["date", "=", currentDate],
    ],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });



  const { data:Laptop }: any = useFrappeGetDocList("Laptop Verify", {
    fields: [
        "image"
    ],
    filters: [["id", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });
  console.log("laptop status",Laptop?.[0] )
  const { data:LaptopSerial }: any = useFrappeGetDocList("Employee", {
    fields: [
        "laptop_sr_no"
    ],
    filters: [["employee", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });
  console.log("laptop serial",LaptopSerial);


  // const itemsArray = data?.map((item) => item.carry.split(", ")).flat();
  const itemsArray = data?.[0].conf_list.split(",");
  const [uncheckedlist, setUncheckedlist] = useState<any>([]);
  const [checkedlist, setCheckedlist] = useState<any>([]);
  const itemsArrayImage = data?.[0].image_list.split("|lak|") || [];
  const Securitydate = data?.[0].date;
  const laptopSerialNumber= LaptopSerial?.[0].laptop_sr_no || "";


  useEffect(() => {
    if (data) {
      setUncheckedlist([...itemsArray]);
    }
  }, [data]);

  console.log(".........", itemsArray);
  // const Location = data?.[0].location;

  const handleUpdateConficatedItems = async () => {
    const checkedItems = Object.keys(formDataCheckBox).filter(
      (item) => formDataCheckBox[item]
    );

    const uncheckedItems = Object.keys(formDataCheckBox).filter(
      (item) => !formDataCheckBox[item]
    );

    const confiscatedupdate = {
      returned_list: checkedlist.join(","),
      pending_list: uncheckedlist.join(","),
      status: "Offline",
    };
    console.log("checked", checkedItems, uncheckedItems);
    try {
      await updateDoc(
        "Security Verification 2",
        `${formDataEmployee.id}-${Securitydate}-${inTime}`,
        confiscatedupdate
      );
      console.log("update Successfully Entry");
    } catch (error) {
      console.error("Error updating doc......:", error);
    }
  };

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    if (!checked) {
      const index = uncheckedlist.indexOf(name);
      if (index !== -1) {
        const updatedUnchecked = [...uncheckedlist];
        const updatedChecked: any = [
          ...checkedlist,
          updatedUnchecked.splice(index, 1)[0],
        ];
        setUncheckedlist(updatedUnchecked);
        setCheckedlist(updatedChecked);
      }
    } else {
      const index = checkedlist.indexOf(name);
      if (index !== -1) {
        const updatedChecked: any = [...checkedlist];
        const updatedUnchecked = [
          ...uncheckedlist,
          updatedChecked.splice(index, 1)[0],
        ];
        setCheckedlist(updatedChecked);
        setUncheckedlist(updatedUnchecked);
      }
    }
  };


  const Location = data?.[0].location;
  const inTime = data?.[0].time;
  const AttendanceDate = data?.[0].date;


  const Carousel = ({ itemsArrayImage }: { itemsArrayImage: string[] }) => {
    const [index, setIndex] = useState(0);
    const move = (direction: String) => {
      if (direction === "next") {
        setIndex((index + 1) % itemsArrayImage.length);
      } else {
        setIndex((index - 1 + itemsArrayImage.length) % itemsArrayImage.length);
      }
    };

    useEffect(() => {
      const interval = setInterval(() => {
        move("next");
      }, 3000);

      return () => clearInterval(interval);
    }, [index]);

    return (
      <div
      className="container"
      style={{
        maxWidth:"30vw",
        height:"30vh",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       flexDirection: "column",
       flex: 1, 
        
        
      }}
      
    >
        <Button onClick={() => move("previous")} className="overlay left">
          <ArrowCircleLeftIcon />
        </Button>
        <img
          style={{ 
          width:"20vw",
          height:"30vh",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         flexDirection: "column",
         flex: 1, 
        }}
          src={itemsArrayImage[index]}
          alt={`item-${index}`}
          loading="lazy"
        />
        <div className="overlay indicator">
          {itemsArrayImage.map((item, i) => (
            <div key={i}></div>
          ))}
        </div>
        <Button onClick={() => move("next")} className="overlay right">
          <ArrowCircleRightIcon />
        </Button>
      </div>
    );
  };

  return (

    <form className="exit-con" onSubmit={handleSubmit} style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
       flex: 1, position: "relative",
     }}> 
      <img src={logo} alt="Logo" className="logo4"></img>
     <div style={{width:"30vw",
         height:"30vh",top:"10%",
       left:"4%",display: "flex",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
       flex: 1, position: "absolute",
       }}>
         
     {itemsArray?.length === 1 && itemsArray?.[0] === "" ? (
       <img
       src={pic1} // Replace with the actual path to your "No Laptop image"
       alt="No Laptop image"
       style={{width:"25vw",
       height:"30vh",display: "flex",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
       flex: 1, position: "absolute",}}
     />
     ) : (
       <Carousel itemsArrayImage={itemsArrayImage} />
     )}
     </div>
     <div
     style={{
       width:"30vw",
       height:"30vh",
       display: "flex",
     justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",right:"0%",top:"12%",
     flex: 1, position: "absolute"
     }}
     >

   {itemsArray?.length > 1? (
       <h2>Confiscated Items:</h2>
     ) : (
       <h3>No Confiscated items </h3>
     )}
     
       <div>
       <FormGroup >
         {itemsArray?.length === 1 && itemsArray?.[0] === "" ? (
           <></>
         ) : (
           itemsArray?.map((item: any, index: any) => (
             <FormControlLabel
               key={index}
               control={
                 <Checkbox
                   checked={formDataCheckBox[item]}
                   onChange={() =>
                     handleCheckboxChange({
                       target: {
                         name: item,
                         // checked: !formDataCheckBox[item],
                         checked: checkedlist.includes(item),
                       },
                     })
                   }
                   name={item}
                 />
               }
               label={item}
             />
           ))
         )}
       {formDataCheckBox.others && (
         <TextField
           label="Other Items"
           variant="outlined"
           name="otherText"
           value={formDataCheckBox.otherText}
           onChange={handleOtherTextChange}
           style={{ marginTop: "16px" }}
         />
       )}
       </FormGroup>
       </div>
       </div>
       <div style={{
         width:"30vw",
         height:"30vh",
         display: "flex",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",left:"3%",bottom:"5%",
       flex: 1, position: "absolute"
       }}>
     {Laptop && Laptop?.[0]?.image ? (
         <img
           src={Laptop?.[0]?.image}
           alt="laptop image"
           style={{width:"15vw",
       height:"30vh",display: "flex",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
       flex: 1, position: "absolute",borderRadius:"10px",}}
           
         />
       ) : (
         <img
           src={pic}  // Replace with the actual path to your "No Laptop image"
           alt="No Laptop image"
           style={{width:"20vw",
       height:"30vh",display: "flex",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
       flex: 1, position: "absolute",borderRadius:"10px",}}
         />
       )}
 </div>

       <div style={{ bottom:"10%",right:"12%" ,display: "flex",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
       flex: 1, position: "absolute"
       }}>
        {Laptop && Laptop?.[0]?.image ? (
          <TextField
          label="Laptop Serial Number"
          variant="outlined"
          name="name"
          value={laptopSerialNumber}
          style={{display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "Proxima Nova",
          fontSize:"bold"
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
       ) : (
          <></>
       )}
           
         <TextField
           label="Location"
           variant="outlined"
           name="name"
           value={Location}
           style={{display: "flex",
           marginTop:"1.5rem",
           justifyContent: "center",
           alignItems: "center",
           flexDirection: "column",
           fontFamily: "Proxima Nova",
           fontSize:"bold"
           }}
           InputLabelProps={{
             shrink: true,
           }}
         />
            <Button
            type="submit"
            variant="contained"
            onMouseEnter={(e) => {
             e.currentTarget.style.transform = "scale(1.05)"; // Increase size on hover
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
           }}
            // color="primary"
            style={{ marginTop: "3rem",
            padding: "8px 15px",
            backgroundColor: "#2D5831",
            borderRadius: "10px",
            fontFamily: "Proxima Nova",
           fontSize:"bold"}}
          >
            {itemsArray?.length === 1 && itemsArray?.[0] === "" ? (
            "Exit"
            ) : (
              "Return"
            )}
          </Button>
        
    
        
       
       </div>
     </form>
);
};

export default ExitCheckBox;

import {
  useFrappeCreateDoc,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

function App() {
  const [userForm, setUserForm] = useState({
    user_name: "",
    email: "",
    address: "",
    in_time: getCurrentTime(),
    company: "",
    employee_name: "",
    mobile: "",
    myOTP: "",
    purpose_of_visit: "",
    image: null,
  });
  console.log(userForm.image);

  const { createDoc } = useFrappeCreateDoc();

  const handleCreateDocument = () => {
    const formData = {
      title: "d1", // Example title
      user_name: userForm.user_name,
      email: userForm.email,
      address: userForm.address,
      in_time: userForm.in_time,
      company: userForm.company,
      employee_name: userForm.employee_name,
      mobile: userForm.mobile,
      purpose_of_visit: userForm.purpose_of_visit,
      image: userForm.image,
    };

    createDoc("Entry Exit", formData)
      .then(() => {
        console.log("Created Successfully");
      })
      .catch((error) => {
        console.log("Error in Creation", error);
      });
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return (
    <div className="App">
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/OutTime" element={<OutTime />} />
          <Route path="/completePage" element={<CompletePage />} />
          <Route
            path="/visitorDetails"
            element={
              <VisitorDetails
                handleCreateDocument={handleCreateDocument}
                forms={[userForm, setUserForm]}
              />
            }
          />
          <Route
            path="/form2"
            element={<VisitorDetails2 forms={[userForm, setUserForm]} />}
          />
          <Route path="/cameraOpening" element={<OpenCameraRoutePage />} />
          <Route path="/ThankyouPage" element={<ThankyouPage />} />
          <Route
            path="/frontCam"
            element={
              <WebcamCapture
                handleCreateDocument={handleCreateDocument}
                forms={[userForm, setUserForm]}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function VisitorDetails(props: any) {
  // const { data } = useFrappeGetDocList("Guest_Agnikul", {
  //   fields: ["user_name", "mobile", "email"],
  // });
  const navigate = useNavigate();
  const [userForm, setUserForm] = props.forms;
  const updateForm = (value: any, field: string) => {
    setUserForm({ ...userForm, [field]: value });
  };

  const employeeDetails = [
    { employeeName: "Srinath Ravichandran" },
    { employeeName: "Syed Peer Mohamed Shah Khadri (Moin)" },
    { employeeName: "Dinesh Parthasarathy" },
    { employeeName: "Saraniya" },
    { employeeName: "Syed Azher Peeran" },
    { employeeName: "Hemaraj Jagadeesh" },
    { employeeName: "Gumperla Akhil" },
    { employeeName: "Arushi Chaudhry" },
    { employeeName: "Jagdeep Gopinath" },
    { employeeName: "Subramanaian" },
    { employeeName: "Srinivasan R" },
    { employeeName: "Rajarathinam L" },
    { employeeName: "Umamaheswari K" },
    { employeeName: "Shritu Badoniya" },
    { employeeName: "Patel Ruchitkumar Ishwarlal" },
    { employeeName: "Devaraj Sridhar" },
    { employeeName: "Ramachadran Babu" },
    { employeeName: "Giritharan Thiruppathirajan" },
    { employeeName: "Kevin Abraham Cherian" },
    { employeeName: "Nisha R" },
    { employeeName: "Karthik K" },
    { employeeName: "Mayukhmali Chakraborty" },
    { employeeName: "Suryaprakash T" },
    { employeeName: "Vasanth Chandrasekaran" },
    { employeeName: "Samiksha Mahakulkar" },
    { employeeName: "Dinesh Kumar S" },
    { employeeName: "Paravathy R" },
    { employeeName: "Rohith R" },
    { employeeName: "Rakesh S" },
    { employeeName: "GGDV Sai Pavan" },
    { employeeName: "Ajay Vincent Raj D" },
    { employeeName: "Meenakshi Khanve" },
    { employeeName: "Dhiliban S" },
    { employeeName: "Harshith Reddy Vangala" },
    { employeeName: "Akhil Sharma" },
    { employeeName: "Srujana J" },
    { employeeName: "Saseekesh S" },
    { employeeName: "Rajesh Satendrakumar Savita" },
    { employeeName: "Suriya Prakesh S" },
    { employeeName: "Sankar S" },
    { employeeName: "Kaliraj A" },
    { employeeName: "Vigneshwaran C" },
    { employeeName: "Suresh R" },
    { employeeName: "Abrar Ahmed" },
    { employeeName: "Jannet Refona" },
    { employeeName: "Aravinth M" },
    { employeeName: "Prathap V" },
    { employeeName: "Nikhilraj A" },
    { employeeName: "Princy Angelin" },
    { employeeName: "Suriya K" },
    { employeeName: "Sayantani Khan" },
    { employeeName: "Anubhav Gupta" },
    { employeeName: "Prateek Gupta" },
    { employeeName: "Akshara R V" },
    { employeeName: "Athigiri Ganadev Shashanka" },
    
    { employeeName: "Prabhu S" },
    { employeeName: "Soundarrajan A" },
    { employeeName: "Gopala Krishnan" },
    { employeeName: "Ajay Pratap Singh" },
    { employeeName: "Shanmuganathan" },
    { employeeName: "Ekantha Prasath" },
    { employeeName: "Dattatreya Paul" },
    { employeeName: "Rakesh RK" },
    { employeeName: "Raveen Kumar V" },
    { employeeName: "Karanam Sreedhar Sai Thilak" },
    { employeeName: "Preethi R" },
    { employeeName: "Durga Jagadeesh Palli" },
    { employeeName: "Rishab Shrivastava" },
    { employeeName: "Sydany Aabitha N" },
    { employeeName: "Pavan Kumar V" },
    { employeeName: "Palli Jayakrishna" },
    { employeeName: "Sneha Gaddamwar" },
    { employeeName: "Pooja Dattatraya Maske" },
    { employeeName: "Kritika Chaudhary" },
    { employeeName: "Abinaya K" },
    { employeeName: "Yuvaraja G" },
    { employeeName: "Sivasundari K" },
    { employeeName: "Kola Prashanth" },
    { employeeName: "Dhirendra Singh Chauhan" },
    { employeeName: "Bhagyashri Bapu Bhagat" },
    { employeeName: "Akshay Atul Mali" },
    { employeeName: "Jagappradeep S" },
    { employeeName: "Alan Joseph" },
    { employeeName: "Adarsh Jayagopal" },
    { employeeName: "Danish Handa" },
    { employeeName: "Suraj Sharma" },
    { employeeName: "Polson Benny" },
    { employeeName: "Kannan S" },
    { employeeName: "Parikshit Suhas Mandvikar" },
    { employeeName: "Manoj RL" },
    { employeeName: "Naushad Feroz" },
    { employeeName: "Roja Gunabal" },
    { employeeName: "Hariharan A" },
    { employeeName: "Subash" },
    { employeeName: "BS Abivarma" },
    { employeeName: "Vijayaraja Shanmugavel" },
    { employeeName: "Suprea Bajaj" },
    { employeeName: "Manikkannan" },
    { employeeName: "Govindasamy" },
    { employeeName: "Lingeshwaran" },
    { employeeName: "Sarfaraz Hussain Riaz Basha" },
    { employeeName: "Raghuvir Gondaliya" },
    { employeeName: "Kathi Ramkumar" },
    { employeeName: "Kiran Hiremath" },
    { employeeName: "Saravanan M" },
    { employeeName: "Fayaq Ahamed" },
    { employeeName: "Tharunkumar P" },
    { employeeName: "Rayadurgam Pavithra" },
    { employeeName: "Rayi Chaithanya" },
    { employeeName: "Lebi Antony J" },
    { employeeName: "Vinothkumar" },
    { employeeName: "OC Krishnakumar " },
    
    { employeeName: "Rajasekaran" },
    { employeeName: "Sadamala Rajesh" },
    { employeeName: "Antony Xavier Navin Thilagaraj" },
    { employeeName: "Mohan T" },
    { employeeName: "Arkoya Abro Harris V" },
    { employeeName: "Mahalakshmi R" },
    { employeeName: "Lakshuram" },
    { employeeName: "KR Adaikappan" },
    { employeeName: "Gowtham N" },
    { employeeName: "Jayakrishnan" },
    { employeeName: "Pallikonda Sasidhar" },
    { employeeName: "Purimittla Gopi Krishna" },
    { employeeName: "Shaik Mansoor" },
    { employeeName: "Premkumar Murugan" },
    { employeeName: "Manikandan K" },
    { employeeName: "Narmatha" },
    { employeeName: "Surya Prasad S" },
    { employeeName: "SU Gokul" },
    { employeeName: "Aravind Potluri" },
    { employeeName: "Nageli Purushotham Naidu" },
    { employeeName: "Bincy Thomas" },
    { employeeName: "Mannepalli Pujitha" },
    { employeeName: "Hari Priya Nedunchezhiyan" },
    { employeeName: "Ajai" },
    { employeeName: "Abhiraaj R C" },
    { employeeName: "Vignesh Singaram" },
    { employeeName: "Parvathavarthini Sivaraman" },
    { employeeName: "Nirmal Kumaran R S" },
    { employeeName: "Sathish Rajan R" },
    { employeeName: "Keerthika Muthusamy" },
    { employeeName: "Praveen D" },
    { employeeName: "Jafar Ali" },
    { employeeName: "Saran S" },
    { employeeName: "J Praveen Bosco" },
    { employeeName: "Rony Philip" },
    { employeeName: "Yokeshwaran P" },
    { employeeName: "Saravanan R" },
    { employeeName: "Keerthi R" },
    { employeeName: "Kamalanathan R" },
    { employeeName: "Arul Raj" },
    { employeeName: "Veerapathiran" },
    { employeeName: "Ganivada Hari" },
    { employeeName: "SriKamatchi S" },
    { employeeName: "Sanjai K" },
    { employeeName: "Ragothaman S" },
    { employeeName: "Sayanta Mitra" },
    { employeeName: "Pranjali Pagare" },
    { employeeName: "Rajaraman S" },
    { employeeName: "Aananth K" },
    { employeeName: "Vaibhav Raj" },
    { employeeName: "Sudeshna Biswas" },
    { employeeName: "Muzammil Aizaz" },
    { employeeName: "Pratyush Agnihotri" },
    { employeeName: "Jeyesh Ramesh Nehete" },
    { employeeName: "Biju G" },
    { employeeName: "Mukul Kumar" },
    { employeeName: "Muddada Ganapathi" },
    
    { employeeName: "Navneet Kumar Kashyap" },
    { employeeName: "Jitendra Singh" },
    { employeeName: "Abhay Agarwal" },
    { employeeName: "Thilagavathy Ezhumala" },
    { employeeName: "Sanjai Ragu" },
    { employeeName: "Malathi Balan" },
    { employeeName: "Samraddhi soni" },
    { employeeName: "Anubhab Debnath" },
    { employeeName: "Gokulmallinga Arjun" },
    { employeeName: "Giriraj" },
    { employeeName: "Jagadeeswaran P" },
    { employeeName: "Sheshathri K" },
    { employeeName: "Anusuya" },
    { employeeName: "Vetrikalaimagal" },
    { employeeName: "Saravana Kumar M" },
    { employeeName: "Mowlisa Theras M" },
    { employeeName: "Kamala" },
    { employeeName: "Priyawart" },
    { employeeName: "Arul Sathyanathan" },
    { employeeName: "Jaswanth Voleti" },
    { employeeName: "Ambalathaduvar" },
    { employeeName: "Dixon Mark A" },
    { employeeName: "Jannu Ram Vishnu Surya" },
    { employeeName: "Vakati Hemanth Kumar Reddy" },
    { employeeName: "Mukka Tejaswi" },
    { employeeName: "Maharajan E" },
    { employeeName: "Rahi Shah" },
    { employeeName: "Vinoth" },
    { employeeName: "Suruthi C" },
    { employeeName: "Teephan Raj" },
    { employeeName: "Yagneshwari R" },
    { employeeName: "Hemalatha Vivekananthan" },
    { employeeName: "Afrin Banu" },
    { employeeName: "Lavanya Sekar" },
    { employeeName: "Aarthy L" },
    { employeeName: "Pritam Mandol" },
    { employeeName: "Dhavamani M" },
    { employeeName: "Angel Jashnai" },
    { employeeName: "Ravikumar C" },
    { employeeName: "Dharma Sai Teja Painam" },
    { employeeName: "Udaya Bala Teja Gannavarapu" },
    { employeeName: "Sathyajith S" },
    { employeeName: "Muniraj D" },
    { employeeName: "Yathish Parshwanth Karkera" },
    { employeeName: "Shubham Anil Thorat" },
    { employeeName: "Ajaya Kumar Patel" },
    { employeeName: "Soumyajyoti Dey" },
    { employeeName: "Sailesh P Kamath" },
    { employeeName: "Chitturi Santhosh Kumar" },
    { employeeName: "Kirankumar Babubhai Purohit" },
    { employeeName: "Ayan Sarkar" },
    { employeeName: "Yash Bharti" },
    { employeeName: "Ujjawal Singh" },
    { employeeName: "Sai Vikas J" },
    { employeeName: "Shadharghya Shankar Adhikary" },
    { employeeName: "Sai Karthik Brahma" },
    { employeeName: "Ronak Arora" },
    
    { employeeName: "Nani Simhadri" },
    { employeeName: "Bijoy Mondal" },
    { employeeName: "Shivansh Tripathi" },
    { employeeName: "Madhav Yerram" },
    { employeeName: "Chaitanya Arjun Kshirsagar" },
    { employeeName: "Sri Krishna Chanakya Parasaram" },
    { employeeName: "Darshan A Raichur" },
    { employeeName: "Gandhi Arumugam" },
    { employeeName: "Lakshmi Narashimman" },
    { employeeName: "Milton Michael Dass" },
    { employeeName: "Prakash Gupta" },
    { employeeName: "Tanuboddi Jevanth" },
    { employeeName: "Princy M T" },
    ];

  const generateOTP = (function () {
    let otpValue = "";

    return function () {
      const otpLength = 6;
      const characters = "0123456789";
      otpValue = "";

      for (let i = 0; i < otpLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otpValue += characters.charAt(randomIndex);
      }

      return otpValue;
    };
  })();

  const generateAndSendOTP = () => {
    const generatedOTP = generateOTP(); // Generate OTP
    setUserForm({ ...userForm, myOTP: generatedOTP });
    const url = `https://login4.spearuc.com/MOBILE_APPS_API/sms_api.php?type=smsquicksend&user=iitmadras&pass=welcome&sender=AGKLPL&t_id=1707169408587414538&to_mobileno=${userForm.mobile}&sms_text=Dear%20Visitor,%20Your%20OTP%20for%20Mobile%20No.%20Verification%20is%20${generatedOTP}%20-%20Agnikul%20Cosmos`;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        // OTP sent successfully
        // Proceed to the next page
      })
      .catch((error) => {
        // Handle error in sending OTP
      });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();

    generateAndSendOTP();
    navigate("/form2");
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* <div style={{ width: "100%", height: "100%", background: "white" }}>
        <div
          style={{
            width: "290%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            marginLeft: "50px",
          }}
        > */}
          <div
            style={{
              backgroundColor: "white",
              width: "550px",
              height: "fit-content",
              borderRadius: "10px",
              padding: "5px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                marginLeft: "220px",
              }}
              src="	https://agnikul.in/group-10.png"
            />

            <div>
              <h2
                style={{
                  color: "#1F272E",
                  marginLeft: "150px",
                  marginTop: "-10px",
                }}
              >
                Welcome to Agnikul
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                padding: "38px",
              }}
            >
              <TextField
                label="Name"
                onChange={(e) => {
                  updateForm(e.target.value, "user_name");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
                required
              />
              <TextField
                label="E-mail"
                onChange={(e) => {
                  updateForm(e.target.value, "email");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
                required
                type = "email"
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                padding: "38px",
              }}
            >
              <TextField
                label="City"
                onChange={(e) => {
                  updateForm(e.target.value, "address");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
              />
               <TextField
                label="Company"
                value={userForm.company}
                onChange={(e) => {
                  updateForm(e.target.value, "company");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
                required
              />
             </div>
              <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                padding: "38px",
                fontWeight: "bold",
              }}>
              <TextField
                label="Mobile"
                onChange={(e) => {
                  updateForm(e.target.value, "mobile");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
                required
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
              />
               <TextField
                label="In-Time"
                value={userForm.in_time}
                onChange={(e) => {
                  updateForm(e.target.value, "in_time");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                // paddingTop: "5px",
                paddingLeft: "38px",
                paddingBottom: "0px !important",
                fontWeight: "bold",
              }}
            >{"Person to Meet"}</div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                paddingLeft: "38px",
                paddingTop: "10px",
              }}
            >
            <Autocomplete
              options={employeeDetails.map((option) => option.employeeName)}
              onChange={(e: any) => {
                updateForm(e.target.innerText, "employee_name");
              }}
              
              renderInput={(params) => (
                <TextField
                {...params}
                label="Employee Name"
                margin="normal"
                variant="outlined"
                sx={{ 
                      // width: "220px",
                      top: "-15px"
                }}
                required
                />
              )}
              style={ {
                width: "220px"

              }}
              />
              <TextField
              label="Purpose of Visit"
              onChange={(e) => {
                updateForm(e.target.value, "purpose_of_visit");
              }}
              style={{
                width: "220px",
                height: "2em",
                backgroundColor: "transparent",
                borderRadius: ".375rem",
              }}
              required
              />
            </div>


            <div style={{ marginLeft: "400px", marginTop: "50px" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#313B44",
                  borderRadius: ".375rem",
                  width: "100px",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  // background: "#213547",
                  alignItems: "center",
                  fontFamily: "proxima-nova ",
                  fontStyle: "normal",
                  fontWeight: "400",
                  margin: "10px",
                  color: "white",
                }}
              >
                {"Next"}
              </button>
              {/* {error && <div>Error: {error.message}</div>} */}
            </div>
          </div>
        {/* </div>
      </div> */}
    </form>
  );
}

function VisitorDetails2(props: any) {
  // const { data } = useFrappeGetDocList("Guest_Agnikul", {
  //   fields: ["user_name", "mobile", "email"],
  // });
  // const navigate = useNavigate();

  return (
    // <div
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     background: "white",
    //   }}
    // >
    //   <div
    //     style={{
    //       width: "280%",
    //       height: "100%",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       minHeight: "100vh",
    //       marginLeft: "50px",
    //     }}
    //   >
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "550px",
              height: "250px",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            <div
              style={{
                color: "#1F272E",
                // marginLeft: "180px",
                marginTop: "-10px",
                // padding: "30px",
              }}
            >
              <h2
                style={{
                  color: "#1F272E",
                  marginLeft: "180px",
                  marginTop: "-10px",
                  padding: "30px",
                }}
              >
                Enter OTP
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "column",
                padding: "-2px",
              }}
            >
              <OtpInput myOTP={props.forms[0].myOTP} />
              {/* <button
                style={{
                  backgroundColor: "rgb(12 110 236)",
                  borderRadius: ".375rem",
                  width: "100px",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",

                  alignItems: "center",
                  fontFamily: "proxima-nova ",
                  fontStyle: "normal",
                  fontWeight: "400",
                  margin: "10px",
                  padding: "25px",
                }}
                disabled={loading}
              >
                {loading ? "Receive OTP....." : "Receive OTP"}
              </button> */}
            </div>

            <div style={{ marginLeft: "400px", marginTop: "50px" }}>
              {/* <button
                type="submit"
                style={{
                  backgroundColor: "#313B44",
                  borderRadius: ".375rem",
                  width: "100px",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  background: "#213547",
                  alignItems: "center",
                  fontFamily: "proxima-nova ",
                  fontStyle: "normal",
                  fontWeight: "400",
                  margin: "10px",
                }}
                disabled={loading}
                onClick={() => navigate("/form2")}
              >
                {loading ? "Submit....." : "Submit"}
              </button> */}
              {/* {error && <div>Error: {error.message}</div>} */}
            </div>
          </div>
        </form>
    //   </div>
    // </div>
  );
}

function OtpInput(props: any) {
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); // State to hold the values of each input field
  console.log(otpValues);
  const handleInput = (index: any, value: any) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters

    // Update the value at the specified index
    const newOtpValues = [...otpValues];
    newOtpValues[index] = numericValue;
    setOtpValues(newOtpValues);

    // Move cursor to the next input field if there's a value and there's a next field
    if (numericValue !== "" && index < otpValues.length - 1) {
      // Use the next input element directly
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    if (numericValue === "" && index > 0) {
      const previousInput = document.getElementById(`otp-input-${index - 1}`);
      if (previousInput) {
        previousInput.focus();
      }
    }
    if (newOtpValues[newOtpValues.length - 1] !== "") {
      if (props.myOTP === newOtpValues.join("")) {
        setTimeout(() => {
          alert("OTP Verified Successfully");
        }, 500);
        setTimeout(() => {
          navigate("/cameraOpening");
        }, 500);

        setTimeout(() => {
          navigate("/frontCam");
        }, 6000);
      } else {
        // Introduce a 2-second delay before showing the alert
        setTimeout(() => {
          alert("Invalid OTP");
          newOtpValues.fill("");
        }, 1000); // 2000 milliseconds = 2 seconds
      }
    }
  };

  return (
    <div
      style={{
        // width: "100vw",
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
      }}
    >
      {otpValues.map((value, index) => (
        <>
          <TextField
            key={index}
            variant="outlined"
            id={`otp-input-${index}`}
            sx={{
              width: "60px",
              height: "40px",
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              textAlign: "center",
              "& input": {
                fontSize: "54px",
                padding: "10",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                outline: "none",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                height: "0.9em",
              },
            }}
            type="text"
            value={value}
            onChange={(e) => handleInput(index, e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Backspace') {
                e.preventDefault();
                handleInput(index, "")
              }
            }}
            inputProps={{
              maxLength: 1,
              // Add the custom event handler
            }}
          />
          {index === 1 || index === 3 ? (
            <h6
              style={{
                color: "black",
              }}
            >
              -
            </h6>
          ) : null}
        </>
      ))}
    </div>
  );
}

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export const WebcamCapture = (props: any) => {
  const [userForm, setUserForm] = props.forms;

  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setUserForm({ ...userForm, image: imageSrc });
    }
  }, []);

  return (
    // <div
    //   style={{
    //     width: "100vw",
    //     height: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "white",
    //     gap: "10px",
    //   }}
    // >
      <div className="webcam-container">
        <div
          className="webcam-img"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            width: "900px",
            height: "550px",
          }}
        >
          {userForm.image === null ? (
            <Webcam
              audio={false}
              height={500}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={550}
              videoConstraints={videoConstraints}
            />
          ) : (
            <img
              style={{
                width: "30vw",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                gap: "10px",
              }}
              src={userForm.image}
              alt="Captured"
            />
          )}
        </div>
        <div>
          {userForm.image !== null ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setUserForm({ ...userForm, image: null });
              }}
              className="webcam-btn"
            >
              Retake Image
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "420px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              Capture
            </button>
          )}
          <button
            onClick={(e) => {
              props.handleCreateDocument();
              navigate("/ThankyouPage");
              setTimeout(() => {
                navigate("/");
              }, 4000);
            }}
            className="webcam-btn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "720px",
            }}
          >
            Next
          </button>
        </div>
      </div>
    // </div>
  );
};

function OpenCameraRoutePage() {
  return (
    // <div
    //   style={{
    //     width: "100vw",
    //     height: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "white",
    //     gap: "10px",
    //     color: "black",
    //   }}
    // >
      <div
        style={{
          backgroundColor: "white",
          width: "550px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        Submit Photo ID for Verification
      </div>
    // </div>
  );
}

function ThankyouPage() {
  return (
    // <div
    //   style={{
    //     width: "100vw",
    //     height: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "white",
    //     gap: "10px",
    //     color: "black",
    //   }}
    // >
      <div
        style={{
          backgroundColor: "white",
          width: "550px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
          flexDirection: "column",
        }}
      >
        <div> Successfully</div> <div>Registered</div>
      </div>
    // </div>
  );
}

function WelcomePage() {
  const navigate = useNavigate();
  return (
  <div
  style={{
  backgroundColor: "white",
  width: "770px",
  height: "fit-content",
  borderRadius: "10px",
  padding: "5px",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  }}
  >
  <div>
  <img
  style={{
  width: "100px",
  height: "100px",
  marginTop: "10px",
  marginLeft: "70px",
  }}
  src=" https://agnikul.in/group-10.png"
  />
  <div>
  <h2
  style={{
  color: "#1F272E",
  marginLeft: "2px",
  marginTop: "-10px",
  }}
  >
  Welcome to Agnikul
  </h2>
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
  className="register"
  onClick={() => {
  navigate("/visitorDetails");
  window.location.reload();
  }}
  style={{
  backgroundColor: "white",
  width: "350px",
  
  height: "250px",
  borderRadius: "10px",
  padding: "15px",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "700",
  fontSize: "20px",
  cursor: "pointer",
  }}
  >
  Entry
  </div>
  <div
  onClick={() => {
  navigate("/OutTime");
  }}
  style={{
  backgroundColor: "white",
  width: "350px",
  height: "250px",
  borderRadius: "10px",
  padding: "15px",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "700",
  fontSize: "20px",
  cursor: "pointer",
  }}
  >
  Exit
  </div>
  </div>
  </div>
  );
  }

// function OutTime() {
//   const { createDoc } = useFrappeCreateDoc();
//   const [userForm2, setUserForm2] = useState({
//     name1: "",
//     out_time: "",
//   });
//   const updateForm = (value: any, field: string) => {
//     setUserForm2({ ...userForm2, [field]: value });
//   };

//   const handleCreateDocument = () => {
//     const formData = {
//       name1: userForm2.name1,
//       out_time: userForm2.out_time,
//     };

//     createDoc("Out_Time_Datas", formData)
//       .then(() => {
//         console.log("Created Successfully");
//       })
//       .catch((error) => {
//         console.log("Error in Creation", error);
//       });
//   };
//   return (
//     <div>
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             gap: "30px",
//             flexDirection: "row",
//             padding: "38px",
//           }}
//         >
//           <TextField
//             label="Name"
//             onChange={(e) => {
//               updateForm(e.target.value, "name1");
//             }}
//             style={{
//               width: "320px",
//               height: "2em",
//               backgroundColor: "transparent",
//               borderRadius: ".375rem",
//             }}
//           />
//           <TextField
//             label="Out Time"
//             onChange={(e) => {
//               updateForm(e.target.value, "out_time");
//             }}
//             style={{
//               width: "320px",
//               height: "2em",
//               backgroundColor: "transparent",
//               borderRadius: ".375rem",
//             }}
//           />

//           <button
//             type="submit"
//             onClick={() => {
//               handleCreateDocument();
//             }}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

function OutTime() {
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const { createDoc } = useFrappeCreateDoc();
  const navigate = useNavigate();
  const [outTime, setOutTime] = useState(getCurrentTime());
  const [name, setName] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [mobile, setMobile] = useState("");
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      out_time: getCurrentTime(),
      mobile: mobile,
      user_name: selectedName
    };

    createDoc("Out Time", formData)
      .then(() => {
        console.log("Created Successfully");

        // setTimeout(() => {
        //   navigate("/completePage");
        // }, 1000);
        navigate("/completePage");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        console.log("Error in Creation", error);
      });

      const url = `https://login4.spearuc.com/MOBILE_APPS_API/sms_api.php?type=smsquicksend&user=iitmadras&pass=welcome&sender=AGKLPL&t_id=1707169415623943909&to_mobileno=${mobile}&sms_text=Dear%20${selectedName},%20Thank%20You%20for%20Visiting%20Agnikul%20Cosmos`;
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
              // OTP sent successfully
              // Proceed to the next page
          })
          .catch((error) => {
              // Handle error in sending OTP
      });
  };

  return (
    // <div>
    //   <div
    //     style={{
    //       width: "100vw",
    //       height: "100vh",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       background: "white",
    //       gap: "10px",
    //       color: "black",
    //     }}
    //   >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexDirection: "row",
              padding: "38px",
            }}
          >
          <SelectSmall
            onSelectName={setSelectedName}
            mobile={mobile}
            SetMobile={setMobile}
            name={name}
            setName={setName}
          />
            {/* <TextField
              label="Mobile"
              style={{
                width: "320px",
                height: "2em",
                backgroundColor: "transparent",
                borderRadius: ".375rem",
              }}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            /> */}
            <TextField
              label="Out Time"
              value={outTime}
              onChange={(e) => {
                setOutTime(e.target.value);
              }}
              style={{
                width: "320px",
                height: "2em",
                backgroundColor: "transparent",
                borderRadius: ".375rem",
              }}
            />

            <button type="submit">Submit</button>
          </div>
        </form>
    //   </div>
    // </div>
  );
}

function SelectSmall({ onSelectName, SetMobile, name, setName }: any) {
  // const [name, setName] = useState("");
  // // const [mobile, SetMobile] = useState("");

  const [filteredData, setFilteredData] = useState<any>([]);
  const { data, isLoading } = useFrappeGetDocList("Entry Exit", {
    fields: ["user_name", "mobile"],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });

  useEffect(() => {
    if (data) {
      const filtered: any = data.filter((item) =>
        (item.user_name || "").toLowerCase().includes(name.toLowerCase() || "")
      );
      setFilteredData(filtered);
    }
  }, [data, name]);
  console.log("data", data);
  console.log("name", name);

  const handleChange = (e: any) => {
    setName(e.target.innerText || "");
    onSelectName(e.target.innerText || "");
    let str = e.target.id;

    SetMobile(filteredData[str.charAt(str.length - 1)].mobile);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Autocomplete
      id="grouped-demo"
      options={filteredData}
      onChange={handleChange}
      getOptionLabel={(option: any) => option.user_name || ""}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Name" variant="outlined" fullWidth />
      )}
    />
  );
}

function CompletePage() {
  return (
    // <div
    //   style={{
    //     width: "100vw",
    //     height: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "white",
    //     gap: "10px",
    //     color: "black",
    //   }}
    // >
      <div
        style={{
          backgroundColor: "white",
          width: "550px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
          flexDirection: "column",
        }}
      >
        <div>Thank You for Visiting</div> <div>Agnikul Cosmos</div>
      </div>
    // </div>
  );
}

export default App;


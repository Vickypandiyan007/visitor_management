// import { useContext } from "react";
// import { locateContext } from "./App";

// export function ThankYouExit() {
//   const { Employee_Name }: any = useContext(locateContext);
//     return (
//       <div>
//       <div style={{
//         display: "flex",
//         justifyContent: "center",
//       }}>
//         <div style={{
//               display:"flex",
//               flexDirection:"column",
//             }}>
//                 <div
//                   style={{
//                     color:"#2D5831",
//                     fontFamily: 'Proxima Nova, sans-serif', 
//                     fontWeight: "bold",
//                     fontSize: "40px",
//                   }}
//                 >
//                   Thank You {Employee_Name}
//                 </div>
//                 <div
//                   style={{
//                     color:"#2D5831",
//                     fontFamily:"Proxima Nova, sans-serif",
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                     margin: "0 10px",
//                     textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//                   }}
//                 >
//                   For Your Productive Hours
//                 </div>
//         </div>
//         </div>
//         <div
//           style={{
//             backgroundColor: "white",
//             width: "550px",
//             height: "250px",
//             borderRadius: "10px",
//             padding: "15px",
//             boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             fontWeight: "700",
//             fontSize: "20px",
//             flexDirection: "column",
//             backgroundImage:
//               "url('https://download-free-images.com/img/00003/thank-you-547794.gif')",
//             backgroundSize: "cover",
//           }}
//         ></div>
//       </div>
//     );
//   }


import { useContext } from "react";
import { locateContext } from "./App";
// import { BirthdayFind } from "./BirthdayFind";
import pic from "./assets/Goodteam.gif";
import "./ThankYouExit.css";

export function ThankYouExit() {
  const { Employee_Name }: any = useContext(locateContext);

  // Array of quotes for each day of the week
  const dayQuotes = [
    "It’s WAAAY more than a Thank You",
    "We appreciate your efforts",
    "We think you did an awesome job",
    "Thank you for your productive hours, see you again tomorrow",
    "Thank you for bringing your best to work every single day.",
    "Have a relaxing and safe weekend !",
    "Sunny Sunday!",
  ];

  // Get the current date
  const currentDate = new Date();
  let dayOfWeek = currentDate.getDay() - 1; // Adjust for Monday being 0

  if (dayOfWeek === -1) {
    // If it's Sunday (0), set dayOfWeek to 6 (Sunday)
    dayOfWeek = 6;
  }

  // Select a quote based on the day of the week
  const selectedQuote = dayQuotes[dayOfWeek];

  return (
    <div>
      <div
        style={{
          width: "50vw",
          height: "70vh",
          borderRadius:"10px",
          backgroundColor: "white",
          display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"column",
        }}
      >
        <div>
        <img
          style={{
            maxWidth:"8vw",
            height: "auto",
            top:"15vh",
            left:"25vw",
            position:"absolute"
          }}
          src=" https://agnikul.in/group-10.png"
        />{" "}
        </div>
        <div
          style={{
            borderRadius: "10px",
            padding: "5px",
            fontWeight: "700",
            fontSize: "20px",
            alignItems: "center",
            justifyContent: "center",
            
          }}
        >
          {selectedQuote && (
            <div>
              <p>{selectedQuote}</p>
            </div>
          )}
          <img
          style={{
            width:"30vw",
            height:"50vh",
            display:"flex",
            justifyContent:"center",
            backgroundSize:"100%",
            backgroundPosition:"center",
            marginTop:"1vh"
          }}
          src={pic}
        />
        </div>
      </div>
    </div>
  );
}


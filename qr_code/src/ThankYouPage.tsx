

import { useContext } from "react";
import { locateContext } from "./App";
import pic from "./assets/welcometa.gif";
import logo from "./assets/logo.png";
export function ThankYouPage() {
  const { Employee_Name }: any = useContext(locateContext);

  // Array of quotes for each day of the week
  const dayQuotes = [
    `Welcome ${Employee_Name}! Everyday is a gift, Have a great week `,
    `Welcome ${Employee_Name}! Keep on chasing your dreams`,
    `Welcome ${Employee_Name}! Smile ! The week is half over`,
    `Hey ${Employee_Name}! Welcome Back`,
    `Welcome ${Employee_Name}! Celebrate the end of the week with joy.`,
    `Welcome ${Employee_Name}! Make today shine brighter than the rest.`,
    "Happy Sunday!",
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
            maxWidth:"3vw",
            height: "auto",
            top:"18vh",
            left:"28vw",
            position:"absolute"
          }}
          src={logo}
        />
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

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useContext } from "react";
import { locateContext } from "./App";
import { Container } from "@mui/system";
import "./StandardListImage.css";
import Grid from '@mui/material/Grid';

export default function StandardListImage() {
  const {formDataEmployee,setFormDataEmployee}:any = useContext(locateContext)
  const { data }: any = useFrappeGetDocList("Employee", {
    fields: ["front", "back", "side_1", "side_2"],
    filters: [["employee", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });
  console.log("lis", data);
  const itemData: any[] = [
    {
      id: 1,
      img: data?.[0].back || "",
      title: "Laptop Image 1",
    },
    {
      id: 2,
      img: data?.[0].side_2 || "",
      title: "Laptop Image 2",
    },
    {
      id: 3,
      img: data?.[0].side_1 || "",
      title: "Laptop Image 3",
    },
    {
      id: 4,
      img: data?.[0].front|| "",
      title: "Laptop Image 4",
    },
  ];

//   return (
//     <div className="stand"> 
//     <ImageList sx={{ width: "26vw", height: "45vh" , backgroundColor:"white",display:"flex",flexDirection:"column",margin:"3%",objectFit:"cover",}} cols={3} rowHeight={100}>
//       {itemData.map((item: any,index:number) => (
//         <ImageListItem className={"imagelist"} key={item.id}
//         cols={index === 0 ? 1 : index === 3 ? 1 : 2}
//           rows={index === 0 ? 5 : index === 3 ? 5 : 3}
//         >
//           <img
//             style={{ height: "40vh",  }}
//             srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//             src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
//             alt={item.title}
//             loading="lazy"
//             // onMouseEnter={(e) => {
//             //   e.currentTarget.style.transform = "scale(1.40)"; // Increase size on hover
//             // }}
//             // onMouseLeave={(e) => {
//             //   e.currentTarget.style.transform = "scale(1)"; // Reset size on mouse leave
//             // }}
//           />
//         </ImageListItem>
//       ))}
//     </ImageList>
//     </div>
//   );

// }
const itemStyles = [
  { width: "50%", height: "86%" }, // Set width and height for item 1 (half of the container)
  { width: "25%", height: "35%" }, // Set width and height for item 2 (larger)
  { width: "25%", height: "35%" }, // Set width and height for item 3 (larger)
  { marginLeft: "240px", width: "100%", height: "50%", marginTop: "-225px" }, // Set width and height for item 4 (filling the container vertically)
];

return (
  <Grid
    container
    spacing={1}
    sx={{
      width: "26vw",
      height: "40vh",
      backgroundColor: "white",
      objectFit: "cover",
    }}
  >
    {itemData.map((item: any, index: number) => (
      <Grid
        item
        // Full width for the first item, half width for the rest
        sx={{
          ...itemStyles[index], // Apply style based on index
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          alt={item.title}
          loading="lazy"
        />
      </Grid>
    ))}
  </Grid>
);
}

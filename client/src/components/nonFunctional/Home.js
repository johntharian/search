import React, {useState, useEffect} from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from 'axios'

import NavBar from "./NavBar";

import bgimg from "../../assets/bg.jpg";

import IndexData from "../IndexData";
import SearchBar from "../Search";

// const checkIndexed = async()=>{
//   console.log("Checking")
//   var indexed = false;
//   const user = localStorage.getItem("user")
//   // console.log(localStorage.getItem("indexed"))
      
//   axios.get("http://localhost:3001/user", {
//   params: { email: user }, // Assuming user.email is the email you want to send as a query parameter
//   }).then((res)=>{
//       console.log(res)
//       indexed = res.data.indexed
//       localStorage.setItem('indexed', indexed)
//       }).catch((err)=>{console.log(err)});
  
  
//   return indexed
// }

const Home = (props) => {
  // const [pr,setPr] = useState(null)
  const { user, setFiles } = props;


  return (
    <>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          p: {
            xs: 2,
            sm: 5,
            md: 2,
          },
          background: `url(${bgimg}) center center`,
          backgroundSize: "100% 100%", // Stretch background image to cover the container
          backgroundRepeat: "repeat-y", // Repeat vertically if content exceeds screen height
          minHeight: "100vh", // Minimum height to cover the entire viewport
          borderRadius: {
            xs: "0px 0px 27px 27px",
            md: "0px 0px 0px 0px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            transition: "opacity 0.3s ease-in-out"
          }}
        >
          <NavBar />
          <Typography
            sx={{
              color: "#fff",
              marginTop: "100.5px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: {
                xs: "38px",
                md: "48px",
              },
              lineHeight: "62px",
              mb: 4,
            }}
          >
            Dashboard
          </Typography>
        </Box>
        <Container sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            transition: "opacity 0.3s ease-in-out",
          }} >
        <IndexData />
        </Container>
        <Container sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            transition: "opacity 0.3s ease-in-out",
          }}>
            <SearchBar setFiles={setFiles}/> 

        </Container>

      </Container>
    </>
  );
};

export default Home;

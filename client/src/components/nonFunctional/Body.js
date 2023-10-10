import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import NavBar from "./NavBar";

import bgimg from "../../assets/bgimg.jpg";
import bgimage3 from "../../assets/bgimg3.jpg";

import BodyContent from "./BodyContent";
import AboutUs from "./AboutUs";
import Login from "../Login";

const Body = ({ setUser }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "search reimagined ...";
  const [showButton, setShowButton] = useState(false); // Add state for the button

  useEffect(() => {
    //  code for displaying "search reimagined ..." letter by letter and after a timeout
    const initialDelay = 1500;
    let currentIndex = 0;
    const typingSpeed = 50;

    const delayTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setShowButton(true); // Show the button when typing is finished
        }
      }, typingSpeed);

      return () => {
        clearInterval(typingInterval);
      };
    }, initialDelay);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contentOpacity = Math.max(1 - scrollPosition / 300, 0);
  const bgOpacity = Math.max(1 - scrollPosition / 500, 0);

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
          background: `url(${bgimg}) center center/cover`,
          minHeight: "1000px",
          borderRadius: {
            xs: "0px 0px 27px 27px",
            md: "0px 0px 54px 54px",
          },
          opacity: bgOpacity,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            opacity: contentOpacity,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <NavBar />
          <Typography
            sx={{
              color: "#fff",
              marginTop: "250.5px",
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
            {typedText}
          </Typography>
          {showButton && <Login setUser={setUser} />}
        </Box>
      </Container>
      <Container maxWidth="false" disableGutters>
        <BodyContent />
      </Container>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          p: {
            xs: 2,
            sm: 5,
            md: 2,
          },
          background: `url(${bgimage3}) center center/cover`,
          minHeight: "1000px",
          borderRadius: {
            xs: "0px 0px 27px 27px",
            md: "54px 54px 54px 54px",
          },
        }}
      >
        <AboutUs />
      </Container>
    </>
  );
};

export default Body;

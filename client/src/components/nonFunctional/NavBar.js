import React, { useState, useEffect } from "react";
import { AppBar } from "@mui/material";
import Container from "@mui/material/Container";
import { Box, Drawer, Typography, IconButton } from "@mui/material";
import Link from "@mui/material/Link";

const NavBar = () => {
  const [user, setUser] = useState("User");
  const [picture, setPicture] = useState("");

  const [sign, setSign] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== undefined) {
      setUser(localStorage.getItem("user"));
      setPicture(localStorage.getItem("picture"));
    }
  }, []);

  const navItems = [
    {
      id: 1,
      name: "Home",
    },
    {
      id: 2,
      name: "How it Works",
    },
    {
      id: 3,
      name: "Sign in",
    },
  ];

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container
        maxWidth="xl"
        sx={{
          px: 10,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
        displayGutters
      >
        <Link underline="none" href="a">
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "20px",
              lineHeight: "21px",
              color: "#fff",
              opacity: 1,
            }}
          >
            Search V6
          </Typography>
        </Link>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "150px",
            marginLeft: "auto",
            // paddingLeft: "20px",
          }}
        >
          {navItems.map((navItem) => {
            if (navItem.name === "Sign in" && sign) {
              // If the navItem is "Sign in" and sign is true, skip rendering it.
              return null;
            }
            return (
              <Link
                href="a"
                key={navItem.id}
                underline="none"
                color="#fff"
                sx={{
                  fontWeight: "300",
                  fontSize: "14px",
                  opacity: 0.7,
                  "&:hover": {
                    opacity: 1,
                  },
                  "&:first-of-type": {
                    opacity: 1,
                  },
                }}
              >
                {navItem.name}
              </Link>
            );
          })}
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "8 px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
                opacity: "0.5",
              }}
            >
              Hey,
            </Typography>

            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
              }}
            >
              {user}
            </Typography>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default NavBar;

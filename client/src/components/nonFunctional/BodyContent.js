import React from "react";
import { Grid, Divider, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const BodyContent = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    elevation: 0,
    // height: "400px",
  }));
  return (
    <>
      <Container>
        <Divider>-</Divider>
        <Grid
          container
          spacing={2}
          columns={18}
          sx={{ backgroundColor: "#fff" }}
        >
          <Grid item xs={6}>
            <Item>Sign in</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Index your drive</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Start searching ...</Item>
          </Grid>
        </Grid>

        <Divider>-</Divider>
      </Container>
    </>
  );
};

export default BodyContent;

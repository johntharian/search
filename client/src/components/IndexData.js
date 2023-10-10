import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";

function IndexData() {
  const code = ""; // changes required
  const [data, setData] = useState(false);

  const index = async () => {
    const res = await axios.post("http://localhost:3001/index/images", code);
    console.log(res);
    if (res.data === "All downloads are complete.") {
      setData(true);
    }
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => index()}>
        Index Drive
      </Button>
    </>
  );
}

export default IndexData;

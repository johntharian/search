import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";

function IndexData() {
    const code="afds"
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
      {/* { data ? (
                <>
                <p>Data indexing is complete</p>
                </>
            ) : ( */}
      <>
        <Button variant="contained" color="primary" onClick={() => index()}>
        Index Drive
        </Button>
        {/* <button onClick={() => index()}>Index Drive</button> */}
      </>

      {/* )} */}
    </>
  );
}

export default IndexData;

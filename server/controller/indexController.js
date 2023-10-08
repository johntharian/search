const asyncHandler = require("express-async-handler");
const fs = require("fs");
const axios= require("axios")



const indexImages = asyncHandler(async (req, res) => {
  const access_token = req.body.code.access_token;
  const refresh_token = req.body.code.refresh_token;
  // console.log(req.body.code)
  // console.log(access_token)
  const responeFromDataserver = await axios.post(
    "http://127.0.0.1:8000/api/data", 
    req.body.code
    )
  console.log(responeFromDataserver.data)
  // const data = await responeFromDataserver.json()
  // console.log(data)
    // Send a completion message
  res.status(200).send("All downloads are complete.");
});

module.exports = indexImages;

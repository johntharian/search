// const asyncHandler = require("express-async-handler");
// const fs = require("fs");

// const download_images_test = async (file) => {
//   console.log("here", file);
//   const fileId = file.id;
//   const fileName = file.name;
//   try {
//     // Download the file from Google Drive
//     const response = await fetch(
//       `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     if (response.ok) {
//       // read data
//       console.log(response.body);
//       const contentType = response.headers.get("content-type");
//       const arrayBuffer = await response.arrayBuffer();
//       const imageBuffer = Buffer.from(arrayBuffer);
//       // await saveImageToFile(imageBuffer, fileName);

//       // Convert the imageBuffer to a Pillow (PIL) Image
//       const image = new Image();
//       image.src = imageBuffer;
//       // Convert the PIL Image to a numpy array
//       const numpyArray = image.toArray();
//       // Store the numpy array in the list
//       imageArray.push(numpyArray);
//       console.log(`${fileName} converted and added to the list`);
//       // console.log(`${fileName} downloaded to system`)
//     } else {
//       console.error(`Error downloading ${fileName}: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error(`Error downloading ${fileName}:`, error);
//   }
// };

// const indexImages = asyncHandler(async (req, res) => {
//   const access_token = req.body.code.access_token;
//   const refresh_token = req.body.code.refresh_token;

  

//   //   async function saveImageToFile(data, filePath) {
//   //     try {
//   //       await fs.promises.writeFile(filePath, data);
//   //     } catch (error) {
//   //       console.error('Error saving image to file:', error);
//   //       throw error;
//   //     }
//   //   }

//   let nextPageToken = null;
//   let counter = 1;
//   do {
//     console.log(`page ${counter}`);

//     if (counter === 1) {
//       var url =
//         "https://www.googleapis.com/drive/v3/files?q=mimeType='image/jpeg'";
//     } else {
//       var url = `https://www.googleapis.com/drive/v3/files?q=mimeType='image/jpeg'&pageToken=${nextPageToken}`;
//     }

//     try {
//       // Fetch files from Google Drive with the nextPageToken

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       });

//       if (response.ok) {
//         var data = await response.json();
//         var files = data["files"];

//         if (data["nextPageToken"]) {
//           counter = counter + 1;
//           //   nextPageToken = data["nextPageToken"];
//         } else {
//           nextPageToken = null;
//         }

//         const filesToDownloadLimited = files.slice(0, 1);

//         // Create an array of download promises
//         const downloadPromises = filesToDownloadLimited.map((file) =>
//           download_images_test(file)
//         );

//         // Wait for all download promises to complete
//         // await Promise.all(downloadPromises);
//       } else {
//         console.error(
//           `Error fetching files from Google Drive: ${response.statusText}`
//         );
//       }
//     } catch (error) {
//       console.error("Error in downloading files:", error);
//       res.status(500).send("Error downloading files.");
//       return;
//     }
//   } while (nextPageToken);

//   console.log("Download completed");
//   console.log(imageArray);
//   // Send a completion message
//   res.status(200).send("All downloads are complete.");
// });

// module.exports = indexImages;

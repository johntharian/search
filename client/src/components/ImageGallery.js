// import React, {useState, useEffect} from "react";

// import axios from "axios";

// // const [image,setImage]

// const GetImages = async(access_token,_ids)=>{
//     var [imageDataArray, setImageDataArray] = useState([]);

//     const imagePromises = _ids.map(async (_id) => {
//         const response = await axios.get(
//           `https://www.googleapis.com/drive/v3/files/${_id}?alt=media`,
//           {
//             headers: {
//               Authorization: `Bearer ${access_token}`,
//             },
//             responseType: 'blob',
//           }
//         );
//         const blob = new Blob([response.data], { type: 'image/jpeg' });
//         const dataUrl = URL.createObjectURL(blob);

//         return dataUrl;
//       })

//     imageDataArray = await Promise.all(imagePromises);
//     setImageDataArray(imageDataArray);

//     return imageDataArray
// }

// const Images = (props) =>{
//     const access_token = props.code.access_token
//     const _ids = props._ids

//     const [imageData, setImageData] = useState(null);

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const data = await GetImages(access_token, _ids);
//           setImageData(data);
//         } catch (error) {
//           console.error("Error fetching images:", error);
//         }
//       };

//       fetchData();
//     }, [access_token, _ids]);
//     return (
//         <>
//         { imageData === null ? (
//             <p>files</p>
//         ):(
//             <>
//             {imageData.map((dataUrl, index) => (
//             <img key={index} src={dataUrl} alt={`Image ${index}`} />
//         ))}
//             </>
//         )}
//         </>
//     )
// }

// export default Images;

import React, { useState, useEffect } from "react";
import axios from "axios";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const GetImages = async (email, _ids) => {
  // const email = localStorage.getItem("email");
  console.log(6);
  console.log(3, email);
  const res = await axios.get("http://localhost:3001/user", {
    params: { email: email }, // Assuming user.email is the email you want to send as a query parameter
  });

  console.log(5, res.data);
  const access_token = res.data.access_token;
  console.log(1, access_token);

  const imagePromises = _ids.map(async (_id) => {
    const response = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${_id}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        responseType: "blob",
      }
    );
    const blob = new Blob([response.data], { type: "image/jpeg" });
    const dataUrl = URL.createObjectURL(blob);

    return dataUrl;
  });

  return Promise.all(imagePromises);
};

// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

const Images = (props) => {
  const email = props.email;
  const _ids = props._ids;

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      // const access_token = await getToken(email);
      // console.log(334,access_token)
      try {
        const imageUrls = await GetImages(email, _ids);
        setImageData(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, [email, _ids]);

  const imageSizeStyle = {
    width: "600px", // Adjust the width as needed
    height: "400px", // Adjust the height as needed
  };

  return (
    <>
      {imageData === null ? (
        <p>Loading images...</p>
      ) : (
        <>
          {/* {imageData.map((dataUrl, index) => (
            <img
             key={index} 
             src={dataUrl} 
             alt={`Image ${index}`} 
             style={imageSizeStyle}
             />
          ))} */}

          <ImageList
            sx={{ width: 500, height: 450 }}
            variant="woven"
            cols={3}
            gap={8}
          >
            {imageData.map((dataUrl, index) => (
              <ImageListItem key={index}>
                <img
                  // srcSet={`${dataUrl}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  src={dataUrl}
                  alt={index}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </>
  );
};

export default Images;

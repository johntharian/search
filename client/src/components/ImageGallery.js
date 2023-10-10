import React, { useState, useEffect } from "react";
import axios from "axios";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const GetImages = async (email, _ids) => {
  const res = await axios.get("http://localhost:3001/user", {
    params: { email: email },
  });

  const access_token = res.data.access_token;

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

const Images = (props) => {
  const email = props.email;
  const _ids = props._ids;

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageUrls = await GetImages(email, _ids);
        setImageData(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, [email, _ids]);

  return (
    <>
      {imageData === null ? (
        <p>Loading images...</p>
      ) : (
        <>
          <ImageList
            sx={{ width: 500, height: 450 }}
            variant="woven"
            cols={3}
            gap={8}
          >
            {imageData.map((dataUrl, index) => (
              <ImageListItem key={index}>
                <img src={dataUrl} alt={index} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </>
  );
};

export default Images;

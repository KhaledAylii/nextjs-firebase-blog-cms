import { useContext } from "react";

export const uploadImage = (image, access_token) => {
  const formData = new FormData();
  formData.append("image", image);
  return fetch("https://api.imgur.com/3/image", {
    method: "POST",
    body: formData,
    headers: {
      [`Authorization`]: `Bearer ${access_token}`,
    },
  }).then((data) => data.json());
};

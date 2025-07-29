import axios from "axios"

// save or update user in db
export const saveUserInDb = async user => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    user
  )
console.log("User saved in DB:", data)
}

// imageUpload.js
export const imageUpload = async (imageFile) => {
  const imgbbApiKey = "6eb7097dd9ce154b26661bd7b4d3d0e4";
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success && data.data && data.data.display_url) {
      return data.data.display_url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (err) {
    console.error("Image upload error:", err);
    throw err;
  }
};

import React, { useRef, useState } from "react";
import axios from "axios";
import { Identity } from "mailersend";

const Upload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      setSelectedImage(file);
      identifyFood(file);
    }
  };

  const identifyFood = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        "https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data.result || "Food Item Not Found");
    } catch (error) {
      console.error(error);
      setResult("Error identifying food item");
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <h1>Upload</h1>
      <p>Upload an image of your ingredient to identify it</p>
      <br />
      <button
        onClick={handleUpload}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload An Image
      </button>
      <hr />
    </div>
  );
};

export default Upload;

import React, { useRef, useState } from "react";
import axios from "axios";

interface LabelAnnotation{
  description: string;
  score: number;
}

interface ApiResponse {
  responses: {
    labelAnnotations: LabelAnnotation[];
  }[];
}

const Upload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const confidenceThreshold = 0.7; //confidence socre Google Vision API

  const excludeKeywords = [
    "Food",
    "Cuisine",
    "Dish",
    "Ingredient",
    "Plate",
    "Container",
    "Utensil",
    "Meal",
    "Vegetable",
    "Fruit",
    "Vertebrate",
    "Plant",
    "Produce",
    "Dairy",
    "Dessert",
    "Baked goods",
    "Staple food",
    "Recipe",
    "Fast food",
  ];

  const handleUpload = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        await setSelectedImage(file);
        identifyFood(file);
      }
    }
  };

  const identifyFood = async (file: File) => {
    const apiKey = "AIzaSyAqlqc_InNWyLN_ZpPod3xTstKFDd77pI0";
    const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
    const content = await fileToBase64(file);
    const imageString = content.split(",")[1];

    const requestBody = {
      requests: [
        {
          features: [
            {
              type: "LABEL_DETECTION",
            },
          ],
          image: {
            content: imageString,
          },
        },
      ],
    };

    try {
      const response = await axios.post<ApiResponse>(apiURL, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);

      const filteredLabels = response.data.responses[0].labelAnnotations.filter(
        (label: LabelAnnotation) => {
          return !excludeKeywords.includes(label.description) && label.score >= confidenceThreshold;
        }
      );
      setResult(filteredLabels[0].description);
    } catch (error) {
      console.error(error);
      setResult("Error identifying food");
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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <br />
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="ingredient"
          style={{ width: "200px", height: "200px" }}
        />
      )}
      <br />
      {result && <p>{result}</p>}
      <hr />
    </div>
  );
};

export default Upload;

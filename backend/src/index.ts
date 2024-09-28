// src/index.ts

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;


app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
})); // Enable CORS due to Same-Origin Policy
app.use(express.json());

// Route to handle Edaman Recipe Recommendations
app.post('/api/get-recipe', async (req: Request, res: Response) => {
    const { fields } = req.body;
    const items:string[] = fields[0];
    const diet:string[] = fields[1];
    const APP_ID = process.env.REACT_APP_EDAMAN_APP_ID;
    const APP_KEY = process.env.REACT_APP_EDAMAN_APP_KEY;

    // API URL
    let API_URL = "";
    if(diet.length > 0){
        API_URL = `https://api.edamam.com/api/recipes/v2?type=any&q=
        ${items
          .map((item) => item)
          .join("%20")}&app_id=${APP_ID}&app_key=${APP_KEY}&diet=${diet.join("&diet=")}`;
    } else {
        // no diet restrictions
        API_URL = `https://api.edamam.com/api/recipes/v2?type=any&q=
        ${items
          .map((item) => item)
          .join("%20")}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    }

    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to handle Cloud Vision Image Recognition
const apiKey = process.env.REACT_APP_CLOUD_VISION_API_KEY;
const apiCloudVisionURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
app.post('/api/get-image', async (req: Request, res: Response) => {
    const { requests } = req.body;
    try {
        const response = await axios.post(apiCloudVisionURL, { requests });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start Backend Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

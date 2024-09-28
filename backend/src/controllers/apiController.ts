// src/controllers/apiController.ts

import { Request, Response } from 'express';
import axios from 'axios';

// Define allowed fields to prevent misuse
const ALLOWED_FIELDS = ['name', 'email', 'age']; // Adjust based on your use case

export const fetchDataController = async (req: Request, res: Response) => {
  try {
    const { fields } = req.body;

    // Validate 'fields' is an array of allowed strings
    if (
      !Array.isArray(fields) ||
      fields.length === 0 ||
      !fields.every(field => typeof field === 'string' && ALLOWED_FIELDS.includes(field))
    ) {
      return res.status(400).json({ message: 'Invalid fields provided.' });
    }

    // Construct external API request
    const externalApiUrl = 'https://external-api.com/data'; // Replace with actual API URL

    // Example: External API expects fields as query parameters
    const params = new URLSearchParams();
    fields.forEach(field => params.append('fields', field));

    const response = await axios.get(externalApiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'X-Secret': process.env.API_SECRET,
      },
      params,
    });

    // Assuming the external API returns an array of data items
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

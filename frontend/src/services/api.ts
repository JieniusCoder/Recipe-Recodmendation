import axios from 'axios';

interface RecipeDataParams {
  fields: string[][]; //[[items], [diet-restrictions]] 
}

interface ImageDataParams {
    requests: {
        features: { type: string }[];
        image: { content: string };
      }[]
}

// backend port: 5000
export const getRecipe = async (params: RecipeDataParams) => {
  try {
    const response = await axios.post('http://localhost:5000/api/get-recipe', params);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getImage = async (params: ImageDataParams) => {
    try {
        const response = await axios.post('http://localhost:5000/api/get-image', params);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
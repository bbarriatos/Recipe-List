import axios from 'axios';

export const recipeApi = 'http://localhost:3001';

export const getRecipe = async () => {
  const response = await axios.get(`${recipeApi}/recipes`);
  return response.data;
};

export const getSpecials = async () => {
  const response = await axios.get(`${recipeApi}/specials`);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${recipeApi}/recipes/${id}`);

  return response.data;
};

export const postRecipe = async (values) => {
  return await axios.post(`${recipeApi}/recipes`, values);
};

export const updateRecipe = async (id, values) => {
  return await axios.patch(`${recipeApi}/recipes/${id}`, values);
};

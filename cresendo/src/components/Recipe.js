import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeApi, getRecipe } from '../actions/recipe';
import axios from 'axios';

const Recipe = () => {
  const [recipeData, setRecipeData] = useState();

  const handleData = async () => {
    setRecipeData(await getRecipe());
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`${recipeApi}/recipes/${id}`);
    handleData();
  };

  useEffect(() => {
    handleData();
  }, []);

  const showRecipes = () => {
    return (
      recipeData &&
      recipeData.map((data) => (
        <div key={data.uuid} className='card'>
          <div className='card-content'>
            <div className='upper-block'>
              <figure>
                {data.images ? (
                  <img
                    src={`${recipeApi}/${data.images.full}`}
                    alt={data.title}
                    className='img-responsive'
                  />
                ) : (
                  <p>
                    <strong>Loading</strong>
                  </p>
                )}
              </figure>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
            </div>

            <div className='bottom-block'>
              <p>{data.postDate}</p>
            </div>

            <Link to={`/recipes/${data.uuid}`}>View</Link>
            <br></br>
            <Link to={`/updateRecipe/${data.uuid}`}>Update Recipe</Link>
            <br></br>
            <button onClick={() => deleteRecipe(data.uuid)}>
              Remove Recipe
            </button>
          </div>
        </div>
      ))
    );
  };

  return (
    <Fragment>
      <Link to='/addRecipe'>Add Recipe</Link>
      <h1>Recipes</h1>
      <div className='recipeList'>{showRecipes()}</div>
    </Fragment>
  );
};

export default Recipe;

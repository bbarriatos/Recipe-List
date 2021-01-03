import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { recipeApi, getRecipeById, getSpecials } from '../actions/recipe';

const Details = ({
  match: {
    params: { id },
  },
}) => {
  const [recipe, setRecipe] = useState();
  const [specials, setSpecials] = useState();

  const handleData = async () => {
    setRecipe(await getRecipeById(id));
    setSpecials(await getSpecials());
  };

  useEffect(() => {
    handleData();
  }, []);

  const recipeImage = (dImage, title) => {
    return dImage ? (
      <img
        src={`${recipeApi}/${dImage}`}
        alt={title}
        className='img-responsive'
      />
    ) : (
      <p>
        <strong>Loading</strong>
      </p>
    );
  };

  const recipeIngredients = (ingredients) => {
    return ingredients.map((ingredient) => (
      <Fragment key={ingredient.uuid}>
        <div className='piece'>
          <strong>{ingredient.name}</strong>
        </div>
        {checkSpecial(ingredient.uuid)}
      </Fragment>
    ));
  };

  const checkSpecial = (id) => {
    return (
      specials &&
      specials.map(function (c) {
        if (c.ingredientId === id) {
          return (
            <div key={c.uuid} className='specials'>
              <p>
                <strong>Title: </strong>
                {c.title}
              </p>
              <p>
                <strong>Type: </strong>
                {c.type}
              </p>
              <p>
                <strong>Description: </strong>
                {c.text}
              </p>
            </div>
          );
        }
      })
    );
  };

  const showDetails = () => {
    return (
      recipe && (
        <div className='details'>
          <div className='image-block'>
            {recipeImage(
              recipe.images ? recipe.images.full : null,
              recipe.title
            )}
          </div>
          <div className='content-block'>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cookTime}
            </p>
            <p>
              <strong>Ingredients:</strong>
            </p>

            {recipeIngredients(recipe.ingredients)}
          </div>
        </div>
      )
    );
  };

  return (
    <Fragment>
      <Link to='/'>Go Back</Link>
      {showDetails()}
    </Fragment>
  );
};

export default Details;

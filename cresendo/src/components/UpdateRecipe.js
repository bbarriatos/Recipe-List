import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { updateRecipe, getRecipeById } from '../actions/recipe';
import Input from '../helpers/input';

const UpdateRecipe = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const [formData, setFormData] = useState();

  const handleData = async () => {
    setFormData(await getRecipeById(id));
  };

  useEffect(() => {
    handleData();
  }, []);

  const validtionReq = Yup.object({
    title: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Title is required.'),
    description: Yup.string()
      .max(250, 'Must be 250 characters or less')
      .required('Description is required'),
    servings: Yup.number()
      .max(15, 'Must be 15 characters or less')
      .required('Need to put number of Servings'),
    prepTime: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Define the preparation time'),
    cookTime: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Define the cook time'),

    ingredients: Yup.array().of(
      Yup.object().shape({
        amount: Yup.number().max(2, 'Must be 2 characters or less'),
        measurement: Yup.string().max(15, 'Must be 15 characters or less'),
        name: Yup.string().max(15, 'Must be 15 characters or less'),
      })
    ),
  });

  const updateForm = () => {
    return formData !== undefined ? (
      <Formik
        initialValues={formData}
        validationSchema={validtionReq}
        onSubmit={async (values, { setSubmitting }) => {
          values.editDate = moment().format('MM/D/YYYY, LT');
          await updateRecipe(id, values);
          history.push('/');
          setSubmitting(false);
        }}
        render={({ values }) => {
          return (
            <Form>
              <Input type='text' name='title' label='Title'></Input>
              <Input
                as='textarea'
                name='description'
                label='Description'
              ></Input>
              <Input type='number' name='servings' label='Servings'></Input>
              <Input type='text' name='prepTime' label='Prep Time'></Input>
              <Input type='text' name='cookTime' label='Cook Time'></Input>

              <p>
                <strong>Ingredient</strong>
              </p>

              <FieldArray
                name='ingredients'
                render={({ push }) => (
                  <Fragment>
                    {values.ingredients.map((ingredient, i) => (
                      <div className='ingredient' key={i}>
                        <Input
                          type='number'
                          name={`ingredients[${i}].amount`}
                          label='Amount'
                        ></Input>
                        <Input
                          type='text'
                          name={`ingredients[${i}].measurement`}
                          label='Measurement'
                        ></Input>
                        <Input
                          type='text'
                          name={`ingredients[${i}].name`}
                          label='Name'
                        ></Input>
                      </div>
                    ))}
                    <div>
                      <button
                        type='button'
                        onClick={async () => {
                          await push({
                            uuid: null,
                            amount: '',
                            measurement: '',
                            name: '',
                          });
                        }}
                      >
                        Add Ingredient
                      </button>
                    </div>
                  </Fragment>
                )}
              ></FieldArray>

              <button type='submit'>Submit</button>
            </Form>
          );
        }}
      ></Formik>
    ) : undefined;
  };

  return (
    <Fragment>
      <Link to='/'>Go Back</Link>
      <h1>Update Recipe</h1>
      {updateForm()}
    </Fragment>
  );
};

export default UpdateRecipe;

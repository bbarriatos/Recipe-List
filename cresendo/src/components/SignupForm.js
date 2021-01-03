import React from 'react';
import { render } from 'react-dom';
import { Formik, Field, Form, FieldArray } from 'formik';

const product_list = [
  { value: 'toys', text: 'Toys' },
  { value: 'books', text: 'Books' },
  { value: 'clothes', text: 'Clothes' },
];

const templateData = {
  product: '',
  price: '',
};
const { product, price } = templateData;

const initialValues = {
  entries: [
    { product, price },
    { product, price },
    { product, price },
    { product, price },
    { product, price },
  ],
};

const SignupForm = () => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={() => ({ foo: true })}
      onSubmit={(values) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={({ values, errors, touched, handleReset, setFieldValue }) => {
        return (
          <Form>
            <FieldArray
              name='entries'
              render={({ insert, remove, push, replace }) => (
                <table>
                  <tr>
                    <td> Product </td> <td> Price </td>
                  </tr>
                  {values.entries.length > 0 &&
                    values.entries.map((friend, index) => (
                      <tr className='row' key={index}>
                        <td className='col'>
                          <Field
                            name={`entries.${index}.product`}
                            id={`entries.${index}.product`}
                            component='select'
                          >
                            <option value='' />
                            {product_list.map(({ value, text }) => (
                              <option value={value}>{text}</option>
                            ))}
                          </Field>
                        </td>

                        <td className='col'>
                          <Field
                            name={`entries.${index}.price`}
                            id={`entries.${index}.price`}
                            type='text'
                          />
                        </td>

                        <td className='col'>
                          <button
                            type='button'
                            className='secondary'
                            onClick={() =>
                              values.entries.length > 5
                                ? remove(index)
                                : replace(index, templateData)
                            }
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  <button
                    type='button'
                    className='secondary'
                    onClick={async () => {
                      await push({});
                    }}
                  >
                    Add Product
                  </button>
                </table>
              )}
            />
            <br />
            <button
              onClick={(event) => {
                event.preventDefault();
                handleReset();
              }}
            >
              Reset
            </button>
            <button type='submit'>Submit</button>
          </Form>
        );
      }}
    />
  </div>
);

export default SignupForm;

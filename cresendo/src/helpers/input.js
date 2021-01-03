import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';

const Input = ({ type, name, as, label }) => {
  const fieldInput = as ? (
    <Field as={as} name={name} label={label}></Field>
  ) : (
    <Field type={type} name={name} label={label}></Field>
  );
  return (
    <Fragment>
      <div>
        <label htmlFor={name}>{label}: </label>
        {fieldInput}
      </div>
      <p className='red'>
        <ErrorMessage name={name}></ErrorMessage>
      </p>
    </Fragment>
  );
};

export default Input;

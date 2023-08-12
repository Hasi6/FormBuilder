import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { RootState } from '@/store/config.ts';
import { Field, FieldType, setErrors, setValue } from '@/store/form.ts';
import FormField from '@/components/FormField';
import {
  generateDateSchema,
  generateNumberSchema,
  generateStringSchema,
} from '@/utils/validationSchema';

export type FieldValue = string | number | boolean | Date;

const FormView: React.FC = () => {
  const { fields } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const handleBlur = (key: string, errors: string[]) => {
    dispatch(setErrors({ key, errors }));
  };

  const handleChange = (key: string, value: FieldValue) => {
    dispatch(setValue({ key, value }));
  };

  const generateSchema = (field: Field) => {
    const { type, rules, value } = field;

    switch (type) {
      case FieldType.String:
        return generateStringSchema(rules, value);
      case FieldType.Number:
        return generateNumberSchema(rules);
      case FieldType.Date:
        return generateDateSchema(rules);
      default:
        return z.any();
    }
  };

  const handleFieldBlur = (field: Field) => {
    const { key, type } = field;
    let value = field.value;

    if (type === FieldType.Number) {
      value = parseInt(String(value));
    } else if (type === FieldType.Date) {
      value = new Date(String(value));
    }

    const result = generateSchema(field).safeParse(value);

    const errorMessages = !result.success
      ? result.error.errors.map((error) => error.message)
      : [];

    handleBlur(key, errorMessages);
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          Form Preview
        </Typography>
      </Grid>
      {Object.entries(fields).map(([key, field]) => (
        <Grid item xs={12} key={key}>
          <FormField
            field={field}
            onBlur={() => handleFieldBlur(field)}
            onChange={(value) => handleChange(key, value)}
            value={field.value}
            errors={field.errors}
          />
          {field.errors.map((error, index) => (
            <Typography
              key={index}
              variant='body2'
              color='error'
              style={{ textAlign: 'left' }}
            >
              {error}
            </Typography>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default FormView;

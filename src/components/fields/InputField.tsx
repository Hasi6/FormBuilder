import { ChangeEvent } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

import { FieldValue } from '@/components/FormView';

export type InputFieldProps = Omit<TextFieldProps, 'onChange'> & {
  label: string;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
};

export const InputField = ({
  label,
  value,
  onChange,
  ...rest
}: InputFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant='outlined'
      fullWidth
      margin='normal'
      {...rest}
    />
  );
};

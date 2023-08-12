import { TextField, TextFieldProps } from '@mui/material';

import { FieldValue } from '@/components/FormView';

type DateFieldProps = {
  label: string;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
};

type Props = DateFieldProps & Omit<TextFieldProps, 'onChange'>;

const DateField = ({ label, value, onChange, ...rest }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      label={label}
      type='date'
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      margin='normal'
      {...rest}
    />
  );
};
export default DateField;

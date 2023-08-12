import { Checkbox, FormControlLabel } from '@mui/material';

import { FieldValue } from '@/components/FormView';

type CheckboxFieldProps = {
  label: string;
  value: FieldValue;
  onChange: (checked: FieldValue) => void;
};

const CheckboxField = ({ label, value, onChange }: CheckboxFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked ? '1' : '0');
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={value === '1'} onChange={handleChange} />}
      label={label}
    />
  );
};

export default CheckboxField;

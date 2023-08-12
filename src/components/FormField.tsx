import {
  InputField,
  InputFieldProps,
} from '@/components/fields/InputField.tsx';
import CheckboxField from '@/components/fields/CheckboxField.tsx';
import DateField from '@/components/fields/DateField.tsx';
import { FieldType } from '@/store/form';
import { FieldValue } from '@/components/FormView';

interface Field {
  label: string;
  type: FieldType;
  value: FieldValue;
  errors: string[];
}

const FormField: React.FC<{
  field: Field;
  onBlur: () => void;
  onChange: (value: FieldValue) => void;
  value: FieldValue;
  errors: string[];
}> = ({ field, onBlur, onChange, value, errors }) => {
  const commonProps: InputFieldProps = {
    label: field.label,
    onChange,
    value,
    error: errors.length > 0,
  };

  switch (field.type) {
    case FieldType.Number:
      return <InputField {...commonProps} type='number' onBlur={onBlur} />;
    case FieldType.String:
      return <InputField {...commonProps} onBlur={onBlur} />;
    case FieldType.Boolean:
      return <CheckboxField {...commonProps} />;
    case FieldType.Date:
      return <DateField {...commonProps} onBlur={onBlur} />;
    default:
      return null;
  }
};

export default FormField;

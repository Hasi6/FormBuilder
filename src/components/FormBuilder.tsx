import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { cloneDeep } from 'lodash';

import DateField from '@/components/fields/DateField';
import { Dropdown } from '@/components/fields/Dropdown.tsx';
import { InputField } from '@/components/fields/InputField';
import { RootState } from '@/store/config.ts';
import { addField, FieldRule, FieldType, Rule } from '@/store/form.ts';
import { rulesByFieldType } from '@/constants';

const FormBuilder = () => {
  const [currentType, setCurrentType] = useState<FieldType>();
  const [currentKey, setCurrentKey] = useState('');
  const [currentLabel, setCurrentLabel] = useState('');
  const [fieldRules, setFieldRules] = useState<{ [key: string]: boolean }>({});
  const [ruleUI, setRuleUI] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const { fields } = useSelector((state: RootState) => state.form);

  const handleAddingField = () => {
    if (fields[currentKey] !== undefined) {
      alert('Key already exists');
      return;
    }

    if (currentType && currentKey && currentLabel) {
      const formRules: FieldRule = {};

      for (const rule of Object.keys(fieldRules)) {
        if (ruleUI[rule] !== undefined) {
          formRules[rule] = {
            value: fieldRules[rule],
            uiValue: ruleUI[rule],
          };
        } else {
          formRules[rule] = {
            value: fieldRules[rule],
          };
        }
      }

      dispatch(
        addField({
          key: currentKey,
          type: currentType,
          label: currentLabel,
          rules: formRules,
        })
      );
    }
  };

  const availableRules: Rule[] = currentType
    ? rulesByFieldType[currentType] || []
    : [];

  const handleRuleChange = (ruleKey: string, value: boolean) => {
    setFieldRules({ ...fieldRules, [ruleKey]: value });
  };

  const handleRuleUIChange = (ruleKey: string, uiValue: string) => {
    setRuleUI({ ...ruleUI, [ruleKey]: uiValue });
  };

  const handleCheckboxChange = (
    fieldRules: { [key: string]: boolean },
    rule: Rule
  ) => {
    if (!fieldRules[rule.key] && rule.ui) {
      setRuleUI({ ...ruleUI, [rule.key]: '' });
    } else {
      const newRuleUI = cloneDeep(ruleUI);
      delete newRuleUI[rule.key];

      setRuleUI({ ...newRuleUI });
    }
    handleRuleChange(rule.key, !fieldRules[rule.key]);
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: 'auto' }}>
      <Grid item xs={12}>
        <Dropdown
          label='Choose a field type'
          value={currentType}
          onChange={(type) => {
            setCurrentType(type as FieldType);
            setFieldRules({});
            setRuleUI({});
          }}
          options={{
            Number: FieldType.Number,
            String: FieldType.String,
            Date: FieldType.Date,
            Boolean: FieldType.Boolean,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setCurrentKey(value as string)}
          label='Key'
          value={currentKey}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setCurrentLabel(value as string)}
          label='Label'
          value={currentLabel}
        />
      </Grid>
      {availableRules.length > 0 && (
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <Typography>Rules Builder:</Typography>
          {availableRules.map((rule) => (
            <div key={rule.key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fieldRules[rule.key] || false}
                    onChange={() => handleCheckboxChange(fieldRules, rule)}
                  />
                }
                label={rule.label}
              />
              {/*  Extra Rule configuration UIs */}
              {fieldRules[rule.key] && rule.ui && (
                <div>
                  {rule.ui.type === 'number' && (
                    <InputField
                      InputProps={{ inputProps: { min: rule.ui.min || 1 } }}
                      label={rule.label}
                      onChange={(value) =>
                        handleRuleUIChange(rule.key, String(value))
                      }
                      type='number'
                      value={ruleUI[rule.key] || ''}
                    />
                  )}
                  {rule.ui.type === 'text' && (
                    <InputField
                      label={rule.label}
                      onChange={(value) =>
                        handleRuleUIChange(rule.key, String(value))
                      }
                      type='text'
                      value={ruleUI[rule.key] || ''}
                    />
                  )}
                  {rule.ui.type === 'date' && (
                    <DateField
                      label={rule.label}
                      onChange={(value) =>
                        handleRuleUIChange(rule.key, String(value))
                      }
                      value={ruleUI[rule.key] || new Date()}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </Grid>
      )}
      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={handleAddingField}>
          Add Field
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormBuilder;

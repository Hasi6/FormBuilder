import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FieldValue } from '@/components/FormView';

export enum FieldType {
  Boolean = 'boolean',
  Date = 'date',
  Number = 'number',
  String = 'string',
}

export type Field = {
  errors: string[];
  key: string;
  label: string;
  type: FieldType;
  value: FieldValue;
  rules: FieldRule;
};

export interface FieldRule {
  [key: string]: {
    value: boolean;
    uiValue?: string;
  };
}

export interface FormState {
  fields: { [key: string]: Field };
}

const initialState: FormState = {
  fields: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (
      state: FormState,
      action: PayloadAction<Omit<Field, 'value' | 'errors'>>
    ) => {
      const { key, type, label, rules } = action.payload;

      state.fields[key] = {
        errors: [],
        key,
        label,
        rules,
        type,
        value: '',
      };
    },
    setValue: (
      state,
      action: PayloadAction<Omit<Field, 'type' | 'label' | 'errors' | 'rules'>>
    ) => {
      const { key, value } = action.payload;
      const field = state.fields[key];

      field.value = value;
    },
    setErrors: (
      state,
      action: PayloadAction<Omit<Field, 'type' | 'label' | 'value' | 'rules'>>
    ) => {
      const { errors, key } = action.payload;
      const field = state.fields[key];
      field.errors = errors;
    },
  },
});

export const { addField, setErrors, setValue } = formSlice.actions;
export const formReducer = formSlice.reducer;

import { FieldType } from '@/store/form';

export interface RuleUI {
  type: 'number' | 'text' | 'date';
  min?: number;
}

export interface Rule {
  helperText?: string;
  key: string;
  label: string;
  ui?: RuleUI;
}

export interface RulesByFieldType {
  [FieldType.String]: Rule[];
  [FieldType.Number]: Rule[];
  [FieldType.Date]: Rule[];
  [FieldType.Boolean]: Rule[];
}

export const rulesByFieldType: RulesByFieldType = {
  [FieldType.String]: [
    { key: 'minLength', label: 'Min Length', ui: { type: 'number', min: 1 } },
    {
      helperText:
        'Add your regex without / in the start and end. like this [A-Z]$',
      key: 'matchesPattern',
      label: 'Regex',
      ui: { type: 'text' },
    },
    { key: 'startsWithCapital', label: 'Start with Capital' },
    { key: 'noSpecialCharacters', label: 'No special Characters' },
    { key: 'isEmail', label: 'Email' },
  ],
  [FieldType.Number]: [
    { key: 'min', label: 'Min Value', ui: { type: 'number' } },
    { key: 'max', label: 'Max Value', ui: { type: 'number' } },
    { key: 'onlyPositive', label: 'Positive number' },
    { key: 'onlyNegative', label: 'Negetive number' },
  ],
  [FieldType.Date]: [
    { key: 'min', label: 'Min Date', ui: { type: 'date' } },
    { key: 'max', label: 'Max Date', ui: { type: 'date' } },
  ],
  [FieldType.Boolean]: [],
};

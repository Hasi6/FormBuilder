import { FieldType, Rule } from '@/store/form';

export interface RulesByFieldType {
  [FieldType.String]: Rule[];
  [FieldType.Number]: Rule[];
  [FieldType.Date]: Rule[];
  [FieldType.Boolean]: Rule[];
}

export const rulesByFieldType: RulesByFieldType = {
  [FieldType.String]: [
    { key: 'minLength', label: 'Min Length', ui: { type: 'number', min: 1 } },
    { key: 'matchesPattern', label: 'Regex', ui: { type: 'text' } },
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

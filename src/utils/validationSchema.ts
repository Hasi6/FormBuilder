import { z } from 'zod';

import { FieldValue } from '@/components/FormView';
import { FieldRule } from '@/store/form';

// Helper function for string validation rules
export const generateStringSchema = (rules: FieldRule, value: FieldValue) => {
  let rule = z.string().nonempty({ message: 'required' });

  if (!value) {
    return rule;
  }

  if (rules?.minLength?.value && rules.minLength.uiValue) {
    const length = rules.minLength.uiValue;
    rule = rule.min(parseInt(length), { message: `min length is ${length}` });
  }

  if (rules?.isEmail?.value) {
    rule = rule.email({ message: 'Invalid Email' });
  }

  if (rules?.noSpecialCharacters?.value) {
    rule = rule.regex(/^[A-Za-z]+$/, {
      message: 'No Special characters allowed',
    });
  }

  if (rules?.startsWithCapital?.value) {
    rule = rule.regex(/^[A-Z]/, {
      message: 'First letter should be a capital letter',
    });
  }

  if (rules?.matchesPattern?.value && rules.matchesPattern.uiValue) {
    const regex = new RegExp(rules.matchesPattern.uiValue);
    rule = rule.regex(regex, {
      message: `match this ${regex} pattern`,
    });
  }

  // Add More rules when needed

  return rule;
};

// Helper function for number validation rules
export const generateNumberSchema = (rules: FieldRule, _: FieldValue) => {
  let rule = z.number();

  if (rules?.min?.value && rules?.min?.uiValue) {
    rule = rule.min(parseInt(String(rules?.min?.uiValue)), {
      message: `Min Value is ${rules?.min?.uiValue}`,
    });
  }

  if (rules?.max?.value && rules?.max?.uiValue) {
    rule = rule.max(parseInt(String(rules?.max?.uiValue)), {
      message: `Max Value is ${rules?.max?.uiValue}`,
    });
  }

  if (rules?.onlyPositive?.value) {
    rule = rule.positive('Only positive numbers are allowed');
  }

  if (rules?.onlyNegative?.value) {
    rule = rule.negative('Only negative numbers are allowed');
  }

  // Add More rules when needed

  return rule;
};

// Helper function for date validation rules
export const generateDateSchema = (rules: FieldRule, value: FieldValue) => {
  let rule = z.date();

  console.log(rules, value);

  if (rules?.max?.value && rules?.max?.uiValue) {
    rule = rule.max(new Date(rules?.max?.uiValue as string));
  }

  if (rules?.min?.value && rules?.min?.uiValue) {
    rule = rule.min(new Date(rules?.min?.uiValue as string));
  }

  // Add More rules when needed

  return rule;
};

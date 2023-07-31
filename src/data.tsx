import type { ButtonText } from './types';

export const digits: ButtonText[] = [
  '7', '8', '9', 
  '4', '5', '6',
  '1', '2', '3',
  '0', '.', '±'
];

export const baseOperaions = [
  'M+', 'MR',
  '+', '-',
  '×', '÷',
  '=', 'CE'
];

const pow = <span>X<sup><small>y</small></sup></span>;
export const extendedOperations: ButtonText[] = [
  'SHIFT', 'C', 'SIN', 'COS', 'TAN', 'EXP', {text: "pow", jsx: pow} , '√', 'LN', 'LOG', '(', ')'
];
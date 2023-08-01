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

const pow = <span>x<sup><small>y</small></sup></span>;
export const extendedOperations: ButtonText[] = [
  [{text: "FN1", jsx: (<span>FN1</span>)},
   {text: "FN2", jsx: (<span>FN2</span>)} 
  ],
  'C',
  [{text: "SIN", jsx: (<span>SIN</span>)},
   {text: "ASIN", jsx: (<span>ASIN</span>)}], 
  [{text: "COS", jsx: (<span>COS</span>)},
   {text: "ACOS", jsx: (<span>ACOS</span>)}], 
  [{text: "TAN", jsx: (<span>TAN</span>)},
   {text: "ATAN", jsx: (<span>ATAN</span>)}], 
  'EXP',
  [{text: "pow", jsx: pow}], 
  '√',
  [{text: "X2", jsx: <span>x<sup><small>2</small></sup></span>}] ,
  'LN',
  'LOG',
  '1/x'
];
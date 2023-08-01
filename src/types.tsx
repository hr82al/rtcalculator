type ExtendedButton = {
  text: string,
  jsx: JSX.Element
}
export type ButtonText = string | ExtendedButton[]

export interface ActionType {
  type: ActionKind;
}

export interface ITaskContext {
  display: string;
  memory: string;
  lastop: string;
  lastresult: string,
  showresult: boolean,
 // stack: (number | string)[]
  fn: boolean;
}


export enum ActionKind {
  "NUM0",
  "NUM1",
  "NUM2",
  "NUM3",
  "NUM4",
  "NUM5",
  "NUM6",
  "NUM7",
  "NUM8",
  "NUM9",
  "." = ".",
  "±" = "±",
  "M+" = "M+",
  "MR" = "MR",
  "+" = "+",
  "-" = "-",
  "×" = "*",
  "÷" = "/",
  "=" = "=",
  "CE" = "CE",
  "FN1" = "FN1",
  "FN2" = "FN2",
  "C" = "C",
  "SIN" = "SIN",
  "COS" = "COS",
  "TAN" = "TAN",
  "ASIN" = "ASIN",
  "ACOS" = "ACOS",
  "ATAN" = "ATAN",
  "EXP" = "EXP",
  "pow" = "**",
  "YSQRTX" = "YSQRTX",
  "√" = "sqrt",
  "LN" = "LN",
  "LOG" = "LOG",
  "X2" = "X2",
  "1/x" = "1/x"
}
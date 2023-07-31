export type ButtonText = string | {
  text: string,
  jsx: JSX.Element
}

export interface ActionType {
  type: ActionKind;
}

export interface ITaskContext {
  display: string;
  memory: string;
  buffer: string;
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
  "SHIFT" = "SHIFT",
  "C" = "C",
  "SIN" = "SIN",
  "COS" = "COS",
  "TAN" = "TAN",
  "EXP" = "EXP",
  "pow" = "pow",
  "√" = "sqrt",
  "LN" = "LN",
  "LOG" = "LOG",
  "(" = "(",
  ")" = ")"
}
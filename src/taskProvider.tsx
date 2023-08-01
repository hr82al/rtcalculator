import { Dispatch, createContext, useContext, useReducer} from 'react';
import { ActionKind, ActionType, ITaskContext } from './types';

// maximum number of positinon on display
const MAX_LENGTH = 15;


const initialTask:ITaskContext = {
  display: "0", 
  memory: "0", 
  lastop: "",
  lastresult: "0",
  showresult: false,
  fn: false,
};

const TasksContext = createContext(initialTask);
const TasksDispatchContext = createContext<Dispatch<ActionType>>(() => {
  return {type: ActionKind.NUM1};
});

export function TaskProvider({ children } : {children: JSX.Element}) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTask);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

export function useTasks() {
  return useContext(TasksContext);
}

function addToDisplay(state: ITaskContext, char: string):ITaskContext {
  if (checkLength(state)) {
    return state;
  } else {
    return {...state, display: state.display.concat(char)};
  }
}

function checkLength(state: ITaskContext) {
  let maxLength = MAX_LENGTH;
  if (state.display[0] === "-") {
    maxLength = MAX_LENGTH - 1;
  } 
  return state.display.length >= maxLength;
}

function isStringNumber(x: string) {
  return !isNaN(Number(x));
}


function numToStr(n: number) {
  return String(Number(n.toFixed(MAX_LENGTH)))
}

function addDigit(state: ITaskContext, actionDigit: ActionKind): ITaskContext {
  // if need to show result previous operations than need it wipe
  if (state.showresult) {
    state = { ...state, display: "0", showresult: false };
  }
  const digit: string = ActionKind[actionDigit as any].slice(-1);
  // prevetn leading zeros
  if (state.display === "0") {
    return { ...state, display: digit };
    // prevent to long number
  } else if (checkLength(state)) {
    return state;
  } else {
    return addToDisplay(state, digit);
  }
}

function addPoint(state: ITaskContext) {
  // if need to show result previous operations than need it wipe
  if (state.showresult) {
    state = { ...state, display: "0", showresult: false };
  }

  // prevetn more then one point in a number
  if (state.display.indexOf(".") === -1) {
    return addToDisplay(state, ".");
  } else {
    return state;
  }
}

function clearDisplay(state: ITaskContext): ITaskContext {
  return {...state, display: "0", lastop: "", lastresult: "0"};
} 

function negate(state: ITaskContext) {
  if (state.display[0] === "-") {
    return {...state, display: state.display.slice(1)};
  } else {
    return {...state, display: "-".concat(state.display)};
  }
}

function addToMemory(state: ITaskContext) {
  let newMemory;
  if (state.display === "0") {
    newMemory = "0";
  } else {
    newMemory = String(Number(state.memory) + Number(state.display));
  }
  return {...state, memory: newMemory};
}

function printFromMemory(state: ITaskContext) {
  return {...state, display: state.memory};
}

function posfixOperation(state: ITaskContext, op: (v: number)=>number): ITaskContext {
  const result = numToStr(op(Number(state.display)));
  return {
    ...state,
    display: result,
  };
}

function calculateBaseOp(state: ITaskContext, op: string): ITaskContext {
  //Hold value to show resul last operaion
  state = {...state, showresult: true};
  let result = state.display;
  if (state.lastop !== "" && state.lastresult !== "") {
    result = numToStr(eval(`${state.lastresult} ${state.lastop} ${state.display}`));
  }
  state = {...state, lastresult: result, lastop: op, display: result};
  if (op === "=") {
    state = {...state, lastop: ""};
  }
  return state;
}

function tasksReducer(state: ITaskContext, action: ActionType): ITaskContext {
  switch (action.type) {
    case ActionKind.NUM0  :
    case ActionKind.NUM1  :
    case ActionKind.NUM2  :
    case ActionKind.NUM3  :
    case ActionKind.NUM4  :
    case ActionKind.NUM5  :
    case ActionKind.NUM6  :
    case ActionKind.NUM7  :
    case ActionKind.NUM8  :
    case ActionKind.NUM9  :
      return addDigit(state, action.type);
    case ActionKind["."]  :
      return addPoint(state);
    case ActionKind["±"]  :
      return negate(state);
    case ActionKind["M+"] :
      return addToMemory(state);
    case ActionKind.MR    :
      return printFromMemory(state);
    case ActionKind["+"]  :
    case ActionKind["-"]  :
    case ActionKind["×"]  :
    case ActionKind["÷"]  :
      return calculateBaseOp(state, action.type);
    case ActionKind.CE    :
      return clearDisplay(state);
    case ActionKind.FN1 :
      return {...state, fn: true};
    case ActionKind.FN2:
      return {...state, fn: false};
    case ActionKind.C     :
      return {...state, display: "0", lastresult: "0", lastop: ""};
    case ActionKind.SIN   :
      return posfixOperation(state, (x) => Math.sin(x * Math.PI / 180));
    case ActionKind.COS   :
      return posfixOperation(state, (x) => Math.cos(x * Math.PI / 180));
    case ActionKind.TAN   :
      return posfixOperation(state, (x) => Math.tan(x * Math.PI / 180));
    case ActionKind.ASIN  :
      return posfixOperation(state, (x) => Math.asin(x) * 180 / Math.PI);
    case ActionKind.ACOS  :
        return posfixOperation(state, (x) => Math.acos(x) * 180 / Math.PI);
    case ActionKind.ATAN  :
          return posfixOperation(state, (x) => Math.atan(x) * 180 / Math.PI);
    case ActionKind.EXP   :
      return posfixOperation(state, Math.exp);
    case ActionKind.pow   :
      return calculateBaseOp(state, action.type);
    case ActionKind["√"]  :
      return posfixOperation(state, Math.sqrt);
    case ActionKind.LN    :
      return posfixOperation(state, Math.log);
    case ActionKind.LOG   :
      return posfixOperation(state, Math.log10);
    case ActionKind["X2"]  :
      return posfixOperation(state, (x) => x ** 2);
    case ActionKind["1/x"]  :
      return posfixOperation(state, (x) => 1 / x);
    case ActionKind["="]  :
      return calculateBaseOp(state, action.type);
    default :
      throw new Error("Unknown action: " + action.type);
  } 
}

// converts button key to action type
export function toAction(n: string): ActionType {
  let t: ActionKind;
  if (isStringNumber(n)) {
    t = ActionKind[`NUM${n}` as any] as ActionKind;
  } else {
    t = ActionKind[n as any] as ActionKind;
  }
  const action ={
      type: t,
      payload: {},
    };
  return action;
}

import { Dispatch, createContext, useContext, useReducer} from 'react';
import { ActionKind, ActionType, ITaskContext } from './types';

// maximum number of positinon on display
const MAX_LENGTH = 16;


const initialTask:ITaskContext = {display: "0", memory: "0", buffer: ""};

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

function addToDisplay(state: ITaskContext, char: string) {
  if (checkLength(state)) {
    return state;
  } else {
    return {...state, display: state.display.concat(char)}
  }
}

function checkLength(state: ITaskContext) {
  let maxLength = MAX_LENGTH;
  if (state.display[0] === "-") {
    maxLength = MAX_LENGTH - 1;
  } 
  return state.display.length >= maxLength;
}

function addDigit(state: ITaskContext, actionDigit: ActionKind) {
  const digit: string = ActionKind[actionDigit as any].slice(-1);
  // prevetn leading zeros
  if (state.display === "0") {
    return {...state, display: digit};
  // prevent to long number
  } else if (checkLength(state)) {
    return state;
  } else {
    return addToDisplay(state, digit);
  }
}

function clearDisplay(state: ITaskContext) {
  const newState = {...state, display: "0"};
  return newState;
} 

function addPoint(state: ITaskContext) {
  // prevetn more then one point in a number
  if (state.display.indexOf(".") === -1) {
    return addToDisplay(state, ".");
  } else {
    return state;
  }
}

function negate(state: ITaskContext) {
  if (state.display[0] === "-") {
    return {...state, display: state.display.slice(1)};
  } else {
    return {...state, display: "-".concat(state.display)};
  }
}

function saveToMemory(state: ITaskContext) {
  return {...state, memory: state.display};
}

function printFromMemory(state: ITaskContext) {
  return {...state, display: state.memory};
}

function performBasicOperation(state: ITaskContext, operator: string) {
  console.log(state.buffer);

  if (state.buffer.length > 0) {
    let buffer = eval(state.buffer.concat(" ", state.display)).toFixed(MAX_LENGTH);
    buffer = String(Number(buffer));
    if (operator === "=") {
      return {...state, buffer: "", display: buffer};
    }
    return {...state, buffer: buffer.concat(" ", operator), display: buffer};
  } else {
    return {
      ...state, 
      buffer: state.buffer.concat(state.display, " ", operator),
      display: "0"
    };
  }
}

function tasksReducer(state: ITaskContext, action: ActionType) {
  //return state;
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
      return saveToMemory(state);
    case ActionKind.MR    :
      return printFromMemory(state);
    case ActionKind["+"]  :
    case ActionKind["-"]  :
    case ActionKind["×"]  :
    case ActionKind["÷"]  :
      
    case ActionKind["="]  :
      return performBasicOperation(state, action.type);
    case ActionKind.CE    :
      return clearDisplay(state);
    case ActionKind.SHIFT :
    case ActionKind.C     :
      return {...state, display: "0", buffer: ""};
    case ActionKind.SIN   :
    case ActionKind.COS   :
    case ActionKind.TAN   :
    case ActionKind.EXP   :
    case ActionKind.pow   :
    case ActionKind["√"]  :
    case ActionKind.LN    :
    case ActionKind.LOG   :
    case ActionKind["("]  :
    case ActionKind[")"]  :
    default :
      throw new Error("Unknown action: " + action.type);
  } 
  console.log(action.type + " " + typeof action.type + " " + ActionKind[(action.type as any)]);
  return state;
}

export function toAction(n: string): ActionType {
  let t: ActionKind;
  if (!isNaN((n as any) as number)) {
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

import { toAction, useTasksDispatch } from "../taskProvider";
import { ButtonText } from "../types";

export function Button({ children }: {children: ButtonText}) {
  let content: string | JSX.Element;
  let action: string;
  if (typeof children === "string") {
    content = children;
    action = children;
  } else {
    content = children.jsx;
    action = children.text;
  }
  const dispatch = useTasksDispatch();
  return (
    <button 
      className="btn"
      onClick={() => {dispatch(toAction(action))}}
    >{content}</button>
  );
}
import { toAction, useTasks, useTasksDispatch } from "../taskProvider";
import { ButtonText } from "../types";

export function Button({ children }: {children: ButtonText}) {
  const fn = useTasks().fn;
  let content: string | JSX.Element;
  let action: string;
  if (typeof children === "string") {
    content = children;
    action = children;
  } else { // if ExtendedButton
    if (children.length == 1) {
      content = children[0].jsx;
      action = children[0].text;
    } else if (children.length == 2) {
      if (fn) {
        content = children[1].jsx;
        action = children[1].text;
      } else {
        content = children[0].jsx;
        action = children[0].text;
      }
    } else {
      throw new Error("Error buttorn rendering");
    }
  }
  const dispatch = useTasksDispatch();
  return (
    <button 
      className="btn"
      onClick={() => {dispatch(toAction(action))}}
    >{content}</button>
  );
}
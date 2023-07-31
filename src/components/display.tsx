import { useTasks } from "../taskProvider";

export function Display() {
  const display = useTasks();
  return (<div className='display'>{display.display}</div>);
}
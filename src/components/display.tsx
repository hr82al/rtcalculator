import { useTasks } from "../taskProvider";

export function Display() {
  const display = useTasks();
  return (
    <div className='display'>
      <div>
      {display.memory !== "0" && "M"}
      </div>
      
      <div>
      {display.display}
      </div>
    </div>);
}
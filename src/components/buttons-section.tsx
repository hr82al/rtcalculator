import { ButtonText } from "../types";
import { Button } from "./button";

export function ButtonsSection({type, buttons}: {type: string, buttons: ButtonText[]}) {
  function toLiItem(btn: ButtonText) {
    let key: string;
    if (typeof btn === "string") {
      key = btn;
    } else {
      key = btn.text;
    }
    return (
      <li key={key}><Button>{btn}</Button></li>
    )
  }
  return (
    <div className={type}>
      <ul>
        {buttons.map(el => 
          toLiItem(el)      
        )}
      </ul>
    </div>
  );
}
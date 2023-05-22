import classes from "./FoodItem.module.css";
import { useRef, useState } from "react";

function FoodItem(props) {
  const inputRef = useRef();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const selectFoodItem = (event) => {
    if (!event || !event.target || !inputRef || inputRef.current.value <= 0) {
      return;
    }

    props.addToCartItem({
      id: props.id,
      name: props.name,
      description: props.description,
      amount: props.amount,
      quantity: Number(inputRef.current.value),
    });

    setIsBtnDisabled(true);
    inputRef.current.value = 0;
  };

  const amountEnteredHandler = (event) => {
    if (!event) {
      return;
    }

    if (event.target.value <= 0) {
      setIsBtnDisabled(true);
      return;
    }

    setIsBtnDisabled(false);
  };

  return (
    <div key={props.id} className={classes["item-container"]}>
      <div>
        <p className="mb-05">{props.name}</p>
        <i className={`${classes.italic} mb-05`}>{props.description}</i>
        <p className={classes.amount}>$ {props.amount}</p>
      </div>
      <div className={classes["add-item-container"]}>
        <div className={classes["amount-container"]}>
          <p className="mr-05">Amount</p>
          <input
            type="number"
            ref={inputRef}
            onChange={amountEnteredHandler}
            className={classes.input}
            min="0"
            defaultValue="0"
          />
        </div>
        <div>
          <button
            type="button"
            disabled={isBtnDisabled}
            className={classes["add-button"]}
            onClick={selectFoodItem}
          >
            + Add
          </button>
        </div>
      </div>
      <div className={`${classes["item-divider"]} mt-1 mb-1`}></div>
    </div>
  );
}

export default FoodItem;

import classes from "./FoodList.module.css";

function FoodList(props) {
  return (
    <div className={classes["list-container"]}>
      {props.foodItems.map((foodItem) => {
        return (
          <div key={foodItem.id} className={classes["item-container"]}>
            <div>
              <p className="mb-05">{foodItem.name}</p>
              <i className={`${classes.italic} mb-05`}>
                {foodItem.description}
              </i>
              <p className={classes.amount}>$ {foodItem.amount}</p>
            </div>
            <div className={classes["add-item-container"]}>
              <div className={classes["amount-container"]}>
                <p className="mr-05">Amount</p>
                <input type="number" className={classes.input} />
              </div>
              <div>
                <button type="button" className={classes["add-button"]}>
                  + Add
                </button>
              </div>
            </div>
            <div className={`${classes["item-divider"]} mt-1 mb-1`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default FoodList;

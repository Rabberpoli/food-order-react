import { useEffect, useState } from "react";
import FoodItem from "./FoodItem/FoodItem";
import classes from "./FoodList.module.css";

function FoodList(props) {
  const [itemToAdd, setItemToAdd] = useState({});

  useEffect(() => {
    props.addCart(itemToAdd);
  }, [itemToAdd]);

  const onAddToCartItem = (value) => {
    setItemToAdd(value);
  };

  return (
    <div className={classes["list-container"]}>
      {props.foodItems.map((foodItem, i) => {
        return (
          <FoodItem
            key={i}
            id={foodItem.id}
            name={foodItem.name}
            description={foodItem.description}
            amount={foodItem.amount}
            addToCartItem={onAddToCartItem}
          ></FoodItem>
        );
      })}
    </div>
  );
}

export default FoodList;

import { useEffect, useState } from "react";
import FoodItem from "./FoodItem/FoodItem";
import classes from "./FoodList.module.css";
import { motion } from "framer-motion";

const variants = {
  open: {
    opacity:1,
    transition: { staggerChildren: 1.07, delayChildren: 1.2 }
  },
  closed: {
    opacity: 0
  }
};

function FoodList(props) {
  const [itemToAdd, setItemToAdd] = useState({});

  useEffect(() => {
    props.addCart(itemToAdd);
  }, [itemToAdd]);

  const onAddToCartItem = (value) => {
    setItemToAdd(value);
  };

  return (
    <motion.div variants={variants} initial='closed' animate='open' className={classes["list-container"]}>
      { props.foodItems && props.foodItems.length > 0 && props.foodItems.map((foodItem, i) => {
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
      { !props || !props.foodItems || !props.foodItems.length && <p> No meals available. </p>}
    </motion.div>
  );
}

export default FoodList;

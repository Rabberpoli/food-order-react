import Button from "../UI/Button/Button";
import classes from "./Header.module.css";
import shopping_bag from "../../assets/icons/shopping_bag.svg";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion"

function Header(props) {
  const ctx = useContext(AuthContext);
  const [foodListCart, setFoodListCart] = useState([]);
  const [countItems, setCountItems] = useState(0);
  const [isCartClicked, setIsCartClicked] = useState(false);

  useEffect(() => {
    const indexFoodItem = foodListCart.findIndex(
      (foodItem) => foodItem.id === ctx.foodItems.id
    );
    if (indexFoodItem >= 0) {
      foodListCart[indexFoodItem].quantity =
        foodListCart[indexFoodItem].quantity + ctx.foodItems.quantity;
      setFoodListCart(foodListCart);
    } else {
      ctx.foodItems && ctx.foodItems.id && foodListCart.push(ctx.foodItems) && setFoodListCart(foodListCart);
    }

    const totalCount =
      (foodListCart &&
        foodListCart.length > 0 &&
        foodListCart.reduce((a, b) => {
          console.log(a);
          console.log(b);
          return a + b.quantity;
        }, 0)) ||
      0;

    totalCount > 99 ? setCountItems("99+") : setCountItems(totalCount);


  }, [ctx.foodItems]);

  const showCartModal = (event) => {
    if (!foodListCart || !foodListCart.length) {
      return;
    }
    setIsCartClicked(true);
  }

  const onCloseDialog = () => {
    setIsCartClicked(false);
  }

  const onCartUpdated = (items) => {
    props.addCart((foodListCart &&
      foodListCart.length > 0 &&
      foodListCart.reduce((a, b) => {
        console.log(a);
        console.log(b);
        return a + b.quantity;
      }, 0)) ||
    0);
  }

  return (
    <React.Fragment>
      <motion.div initial={{y:-100, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1.5, type:'spring', stiffness:120}} className={classes["header-container"]}>
      <p className={classes["title-header"]}>{props.children}</p>
      <Button type={"button"}>
        <div className={classes["img-text-container"]} onClick={showCartModal}>
          <img
            className={classes["shopping-svg"]}
            src={shopping_bag}
            alt=""
          ></img>
          <p className="align-self-center"> Your Cart </p>
        </div>
        <div className={classes["counter-container"]}>
          <p className={classes["counter-text"]}>{countItems}</p>
        </div>
      </Button>
    </motion.div>
    {
      isCartClicked && createPortal(<Cart closeDialog={onCloseDialog} foodItemsAdded={foodListCart} cartUpdated={onCartUpdated}></Cart>, document.getElementById('root'))
    }
    </React.Fragment>
  );
}

export default Header;

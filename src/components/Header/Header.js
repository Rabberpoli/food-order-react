import Button from "../UI/Button/Button";
import classes from "./Header.module.css";
import shopping_bag from "../../assets/icons/shopping_bag.svg";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect, useState } from "react";

function Header(props) {
  const ctx = useContext(AuthContext);
  const [foodListCart, setFoodListCart] = useState([]);
  const [countItems, setCountItems] = useState(0);

  useEffect(() => {
    const indexFoodItem = foodListCart.findIndex(
      (foodItem) => foodItem.id === ctx.foodItems.id
    );
    if (indexFoodItem >= 0) {
      foodListCart[indexFoodItem].quantity =
        foodListCart[indexFoodItem].quantity + ctx.foodItems.quantity;
    } else {
      ctx.foodItems && ctx.foodItems.id && foodListCart.push(ctx.foodItems);
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

    totalCount > 50 ? setCountItems("50+") : setCountItems(totalCount);
  }, [ctx.foodItems]);

  return (
    <div className={classes["header-container"]}>
      <p className={classes["title-header"]}>{props.children}</p>
      <Button type={"button"}>
        <div className={classes["img-text-container"]}>
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
    </div>
  );
}

export default Header;

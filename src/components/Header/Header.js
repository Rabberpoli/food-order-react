import Button from "../UI/Button/Button";
import classes from "./Header.module.css";
import shopping_bag from "../../assets/icons/shopping_bag.svg";

function Header(props) {
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
          <p className={classes["counter-text"]}>3</p>
        </div>
      </Button>
    </div>
  );
}

export default Header;

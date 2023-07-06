import classes from "./Cart.module.css";
import React, { useCallback, useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import { AnimatePresence, motion } from "framer-motion";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

const overlay = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.1,
      delay: 0.7,
    },
  },
};

const modal = {
  open: {
    y: 0,
    transition: {
      delay: 0.2,
      duration: 1,
      type: "spring",
    },
  },
  closed: {
    y: -700,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
};

function Cart(props) {
  const [showResult, setShowResult] = useState(true);
  const [foodItemsAdded, setFoodItemsAdded] = useState(props.foodItemsAdded);
  const [showForm, setShowForm] = useState(false);
  const [bodyForm, setBodyForm] = useState({});

  const {
    value: enteredShirtColor,
    hasError: hasShirtColorError,
    isValid: enteredShirtColorIsValid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDogName,
    hasError: hasDogNameError,
    isValid: enteredDogNameIsValid,
    inputChangeHandler: surnameInputChangeHandler,
    inputBlurHandler: surnameInputBlurHandler,
    reset: resetSurnameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredFavoriteColor,
    hasError: hasFavoriteColorError,
    isValid: enteredFavoriteColorIsValid,
    inputChangeHandler: addressInputChangeHandler,
    inputBlurHandler: addressInputBlurHandler,
    reset: resetAddressInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredHeight,
    hasError: hasHeightError,
    isValid: enteredHeightIsValid,
    inputChangeHandler: mailInputChangeHandler,
    inputBlurHandler: mailInputBlurHandler,
    reset: resetMailInput,
  } = useInput((value) => value.trim() !== "");

  const applyData = (jsonObj) => {
    setBodyForm(jsonObj);
  };

  const { isLoading, isError, sendRequest } = useHttp();

  useEffect(() => {
    if (foodItemsAdded.length > 0) {
      getTotalAmount();
      props.cartUpdated(foodItemsAdded);
      return;
    }

    props.cartUpdated(foodItemsAdded);
    closeDialog();
  }, [foodItemsAdded]);

  const getTotalAmount = () => {
    return foodItemsAdded
      .reduce((a, b) => {
        return a + b.amount * b.quantity;
      }, 0)
      .toFixed(2);
  };

  const closeDialog = () => {
    setShowResult(false);
    props.closeDialog();
  };

  const order = () => {
    setShowForm(true);
  };

  const onDeleteItem = (id) => {
    setFoodItemsAdded((prevState) => [...prevState.filter((p) => p.id !== id)]);
  };

  const onUpdateSummary = (id, quantity) => {
    const itemIndex = foodItemsAdded.findIndex((item) => item.id === id);
    if (itemIndex >= 0) {
      const arrayCopy = [...foodItemsAdded];
      arrayCopy[itemIndex].quantity = quantity;
      setFoodItemsAdded(arrayCopy);
      return;
    }
  };

  const back = () => {
    setShowForm(false);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredShirtColorIsValid ||
      !enteredDogNameIsValid ||
      !enteredFavoriteColorIsValid ||
      !enteredHeightIsValid
    ) {
      return;
    }

    setFoodItemsAdded([])

    // Call to http post
    setBodyForm({
      enteredShirtColor,
      enteredDogName,
      enteredHeight,
      enteredFavoriteColor,
    });

    sendRequest(
      "https://food-order-react-a8a70-default-rtdb.europe-west1.firebasedatabase.app/user-form.json",
      "POST",
      {enteredShirtColor,
        enteredDogName,
        enteredHeight,
        enteredFavoriteColor},
      applyData
    );

    resetNameInput();
    resetSurnameInput();
    resetAddressInput();
    resetMailInput();
    
    // closeDialog();
  };

  const modalContent = () => {
    if (showForm) {
      return (
        <motion.div>
          <h2 className="mb-2">
            We're preparing your order! Just fill these fields to receive your
            meals
          </h2>
          <form onSubmit={formSubmissionHandler}>
            <div className="display-flex flex-flow-cl mb-2">
              <label> Shirt color </label>
              <input
                className={classes["form-input"]}
                type="text"
                onChange={nameInputChangeHandler}
                onBlur={nameInputBlurHandler}
                value={enteredShirtColor}
              />
              {hasShirtColorError && (
                <p className={classes["warning-text"]}>
                  Shirt color must not be empty
                </p>
              )}
            </div>
            <div className="display-flex flex-flow-cl mb-2">
              <label> Dog name </label>
              <input
                className={classes["form-input"]}
                type="text"
                onChange={surnameInputChangeHandler}
                onBlur={surnameInputBlurHandler}
                value={enteredDogName}
              />
              {hasDogNameError && (
                <p className={classes["warning-text"]}>
                  Dog name must not be empty{" "}
                </p>
              )}
            </div>
            <div className="display-flex flex-flow-cl mb-2">
              <label> Favorite color </label>
              <input
                className={classes["form-input"]}
                type="text"
                onChange={addressInputChangeHandler}
                onBlur={addressInputBlurHandler}
                value={enteredFavoriteColor}
              />
              {hasFavoriteColorError && (
                <p className={classes["warning-text"]}>
                  Favorite color must not be empty{" "}
                </p>
              )}
            </div>
            <div className="display-flex flex-flow-cl mb-2">
              <label> Height (cm)</label>
              <input
                className={classes["form-input"]}
                type="mail"
                onChange={mailInputChangeHandler}
                onBlur={mailInputBlurHandler}
                value={enteredHeight}
              />
              {hasHeightError && (
                <p className={classes["warning-text"]}>
                  Height must not be empty and must be a number
                </p>
              )}
            </div>
            <div className="display-flex justify-content-end mt-3">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                type="button"
                className={`${classes["cart-btn-close"]} ml-3`}
                onClick={back}
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`${classes["cart-btn-order"]} ml-3`}
                disabled={
                  !enteredShirtColorIsValid ||
                  !enteredDogNameIsValid ||
                  !enteredFavoriteColorIsValid ||
                  !enteredHeightIsValid
                }
              >
                Send
              </motion.button>
            </div>
          </form>
        </motion.div>
      );
    } else {
      return (
        <React.Fragment>
          {foodItemsAdded.map((item) => {
            return (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                amount={item.amount}
                quantity={item.quantity}
                deleteItem={onDeleteItem}
                updateSummary={onUpdateSummary}
              ></CartItem>
            );
          })}
          <div className={`${classes["item-divider"]} mb-1 mt-1`}></div>
          <div className="display-flex justify-content-space-between">
            <p className={classes.total}>Total amount</p>
            <p className={classes.total}>{getTotalAmount()}</p>
          </div>
          <div className="display-flex justify-content-end mt-3">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              type="button"
              className={`${classes["cart-btn-close"]} ml-3`}
              onClick={closeDialog}
            >
              Close
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className={`${classes["cart-btn-order"]} ml-3`}
              onClick={order}
            >
              Order
            </motion.button>
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      {showResult && (
        <motion.div
          variants={overlay}
          initial="closed"
          animate="open"
          exit="closed"
          id="modal"
          className={classes["cart-modal"]}
        >
          <motion.div
            variants={modal}
            initial="closed"
            animate="open"
            exit="closed"
            className={classes["cart-modal-content"]}
          >
            {modalContent()}
          </motion.div>
        </motion.div>
      )}
    </React.Fragment>
  );
}

export default Cart;

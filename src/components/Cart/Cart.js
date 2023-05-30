import classes from './Cart.module.css';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem/CartItem';
import { AnimatePresence, motion } from "framer-motion";

const overlay = {
  open: {
    opacity:1,
    transition: {
      duration:0.1
    }
  },
  closed: {
    opacity:0,
    transition: {
      duration:0.1,
      delay: 0.7
    }
  }
}

const modal = {
  open: {
    y:0,
    transition: {
      delay: 0.2,
      duration:1,
      type: 'spring'
    }
  },
  closed: {
    y:-700,
    transition: {
      duration:1,
      type: 'spring'
    }
  }
}

function Cart(props) {

  const [showResult, setShowResult] = useState(true);
  const [foodItemsAdded, setFoodItemsAdded] = useState(props.foodItemsAdded);

  useEffect(()=>{
    if(foodItemsAdded.length > 0) {
      getTotalAmount();
      props.cartUpdated(foodItemsAdded)
      return;
    }

    props.cartUpdated(foodItemsAdded)
    closeDialog();
  }, [foodItemsAdded])

  const getTotalAmount = () => {
    return foodItemsAdded.reduce( (a,b) => {
      return a + b.amount*b.quantity
    }, 0).toFixed(2)
  }

  const closeDialog = () => {
    setShowResult(false);
    props.closeDialog();
  }

  const order = () => {
    window.alert('Food ordered!')
  }

  const onDeleteItem = (id) => {
    setFoodItemsAdded(prevState => [...prevState.filter(p => p.id !== id)])
  }

  const onUpdateSummary = (id, quantity) => {
    const itemIndex = foodItemsAdded.findIndex( item => item.id === id );
    if (itemIndex >= 0) {
      const arrayCopy = [...foodItemsAdded];
      arrayCopy[itemIndex].quantity = quantity; 
      setFoodItemsAdded(arrayCopy);
      return;
    }
  }

  return (
      <AnimatePresence onExitComplete={()=>null}>
        {showResult && <motion.div variants={overlay} initial='closed' animate='open' exit='closed' id='modal' className={classes['cart-modal']}>
          <motion.div variants={modal} initial='closed' animate='open' exit='closed' className={classes['cart-modal-content']}>
            {
              foodItemsAdded.map(item => {
                return (
                  <CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} quantity={item.quantity} deleteItem={onDeleteItem} updateSummary={onUpdateSummary}></CartItem>
                )
              })
            }
            <div className={`${classes['item-divider']} mb-1 mt-1`}>

            </div>
            <div className='display-flex justify-content-space-between'>
              <p className={classes.total}>Total amount</p>
              <p className={classes.total}>
                {getTotalAmount()}
              </p>
            </div>
            <div className='display-flex justify-content-end mt-3'>
              <motion.button whileHover={{scale: 1.2}} whileTap={{scale:0.8}} type='button' className={`${classes['cart-btn-close']} ml-3`} onClick={closeDialog}> Close </motion.button>
              <motion.button whileHover={{scale: 1.2}} whileTap={{scale:0.8}} className={`${classes['cart-btn-order']} ml-3`} onClick={order}> Order </motion.button>
            </div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
  );
}

export default Cart;

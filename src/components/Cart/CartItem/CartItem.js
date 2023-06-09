import { useEffect, useRef, useState } from 'react';
import classes from './CartItem.module.css';
import { motion } from "framer-motion";

function CartItem(props) {

    const [quantity, setQuantity] = useState(props.quantity);
    const [isItemToShow, setIsItemToShow] = useState(true);

    useEffect(()=> {
        if (quantity===0) {
            setIsItemToShow(false);
            props.updateSummary(props.id, quantity);
            props.deleteItem(props.id)
            return;
        }

        props.updateSummary(props.id, quantity)

    }, [quantity])

    const modifyOrder = (op, event) => {
        event.stopPropagation();

        if (op==='add') {
            setQuantity((prevValue) => {
                return prevValue + 1;
            })
        } else if (op==='sub'){
            setQuantity((prevValue) => {
                return prevValue - 1;
            }) 
        }
    }

    return (
        isItemToShow ? 
        <div key={props.id} className='display-flex justify-content-space-between mb-2'>
            <div className='display-flex flex-flow-cl flex-50'>
            <h2 className='mb-1'> {props.name} </h2>
            <div className='display-flex'>
                <p className={`${classes['modal-amount']} mr-7`}>${props.amount}</p>
                <div className={classes['quantity-container']}>
                x{quantity}
                </div>
            </div>
            </div>
            <div className='display-flex justify-content-end'>
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.7, transition: {type: 'spring'}}} type='button' className={`${classes['add-remove-item-btn']} ml-3 align-self-center`} onClick={(ev) => modifyOrder('sub', ev)}> - </motion.button>
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.7, transition: {type: 'spring'}}} type='button' className={`${classes['add-remove-item-btn']} ml-3 align-self-center`} onClick={(ev) => modifyOrder('add', ev)}> + </motion.button>
            </div>
        </div> : null
    )
}

export default CartItem;
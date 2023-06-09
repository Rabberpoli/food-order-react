import React from "react";
import {motion} from 'framer-motion';
import classes from './Logo.module.css';

const icon = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
    }
};

const wordAnimation = {
  hidden: {},
  visible: {},
};

const characterAnimation = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

function Logo() {
    const titleLogo = 'React Meals';

    return (
      <React.Fragment>
        <motion.svg className="align-self-center" width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
          }} d="M38 13C38 13.3614 37.9154 13.5284 37.8509 13.6162C37.7784 13.7149 37.6253 13.8553 37.2743 13.99C36.5075 14.2843 35.2377 14.3912 33.386 14.3238C31.9512 14.2716 30.3237 14.125 28.5207 13.9625C28.0477 13.9199 27.5627 13.8762 27.0659 13.8328C24.7033 13.6265 22.1226 13.433 19.5 13.433C16.8761 13.433 14.3571 13.6267 12.085 13.8333C11.5579 13.8812 11.0472 13.9295 10.553 13.9762C8.8883 14.1335 7.40926 14.2733 6.11004 14.324C4.38223 14.3914 3.26302 14.2808 2.61326 14.0076C2.32798 13.8877 2.20765 13.7659 2.14648 13.6739C2.08501 13.5814 2 13.3937 2 13C2 10.9793 2.91928 8.40665 5.50708 6.30891C8.10205 4.20535 12.4825 2.5 19.5 2.5C26.5524 2.5 31.2108 4.03417 34.063 6.08094C36.8868 8.10737 38 10.6675 38 13Z" stroke="#E55C14" strokeWidth="3"/>
          <motion.path variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
          }} d="M1 19.5H2.59606C3.85226 19.5 5.09537 19.2448 6.25 18.75V18.75C7.40463 18.2552 8.64774 18 9.90394 18H11.0961C12.3523 18 13.5954 18.2552 14.75 18.75V18.75C15.9046 19.2448 17.1477 19.5 18.4039 19.5H20.0323C21.0056 19.5 21.9736 19.3579 22.9058 19.0783L25.0942 18.4217C26.0264 18.1421 26.9944 18 27.9677 18H29.6867C30.8858 18 32.0751 18.2157 33.1979 18.6367L33.8021 18.8633C34.9249 19.2843 36.1142 19.5 37.3133 19.5H38.5" stroke="#E55C14" strokeWidth="3"/>
          <motion.path variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
          }} d="M1 24.5H2.59606C3.85226 24.5 5.09537 24.2448 6.25 23.75V23.75C7.40463 23.2552 8.64774 23 9.90394 23H11.0961C12.3523 23 13.5954 23.2552 14.75 23.75V23.75C15.9046 24.2448 17.1477 24.5 18.4039 24.5H20.0323C21.0056 24.5 21.9736 24.3579 22.9058 24.0783L25.0942 23.4217C26.0264 23.1421 26.9944 23 27.9677 23H29.6867C30.8858 23 32.0751 23.2157 33.1979 23.6367L33.8021 23.8633C34.9249 24.2843 36.1142 24.5 37.3133 24.5H38.5" stroke="#E55C14" strokeWidth="3"/>
          <motion.path variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
          }} d="M2.5 29.5H36.5V33C36.5 34.933 34.933 36.5 33 36.5H6C4.067 36.5 2.5 34.933 2.5 33V29.5Z" stroke="#E55C14" strokeWidth="3"/>
      </motion.svg>
      {
        titleLogo.split(" ").map((word, index) => {
          return (
            <motion.div className={classes.text} 
                        initial="hidden"
                        animate="visible"
                        variants={wordAnimation}
                        transition={{
                          delayChildren: index * 0.5,
                          staggerChildren: 0.05,
                        }}>
              {
                word.split("").map((char, index)=> {
                  return <motion.span key={index}
                            variants={characterAnimation}>
                          {char}
                        </motion.span>
                })
              }
            </motion.div>
          )
        })
      }
    </React.Fragment>
      
    )
}

export default React.memo(Logo);
import { useEffect, useState } from "react";
import FoodList from "./components/FoodList/FoodList";
import Header from "./components/Header/Header";
import PresentationCard from "./components/UI/PresentationCard/PresentationCard";
import AuthContext from "./store/auth-context";
import { motion } from "framer-motion";
import useHttp from "./hooks/use-http";
import React from "react";
import Logo from "./components/UI/Logo/Logo";

function App() {
  const title = "Delicious Food, Delivered To You!";
  const content = `Choose your favourite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.
All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!`;
  const [itemToAdd, setItemToAdd] = useState([]);

  const [data, setData] = useState([]);
  const applyData = (jsonObj) => {
    setData(jsonObj);
  };

  const { isLoading, isError, sendRequest } = useHttp();

  const onAddToCartItem = (value) => {
    setItemToAdd(value);
  };

  useEffect(() => {
    sendRequest(
      "https://food-order-react-a8a70-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      "GET",
      null,
      applyData
    );
  }, []);

  return (
    <div className="main-container">
      {!isLoading && !isError && (
        <React.Fragment>
          <AuthContext.Provider value={{ foodItems: itemToAdd }}>
            <Header addCart={onAddToCartItem}> ReactMeals </Header>
          </AuthContext.Provider>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, type: "spring", delay: 0.2 }}
            className="display-flex section-container align-items-center justify-content-center"
          >
            <PresentationCard
              title={title}
              content={content}
            ></PresentationCard>
          </motion.section>
          <motion.section className="pb-2 display-flex justify-content-center">
            <FoodList foodItems={data} addCart={onAddToCartItem}></FoodList>
          </motion.section>
        </React.Fragment>
      )}
      {!isLoading && isError && <p>Error retrieving meals</p>}
      {isLoading && (
        <div className="main-container display-flex justify-content-center flex-flow-cl">
          <Logo></Logo>
        </div>
      )}
    </div>
  );
}

export default App;

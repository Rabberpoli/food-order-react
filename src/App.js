import { useState } from "react";
import FoodList from "./components/FoodList/FoodList";
import Header from "./components/Header/Header";
import PresentationCard from "./components/UI/PresentationCard/PresentationCard";
import getFoodItems from "./data/food-list-items";
import AuthContext from "./store/auth-context";

function App() {
  const title = "Delicious Food, Delivered To You!";
  const content = `Choose your favourite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.
All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!`;
  const [itemToAdd, setItemToAdd] = useState([]);

  const onAddToCartItem = (value) => {
    setItemToAdd(value);
  };

  return (
    <div className="main-container">
      <AuthContext.Provider value={{ foodItems: itemToAdd }}>
        <Header> ReactMeals </Header>
      </AuthContext.Provider>
      <section className="display-flex section-container align-items-center justify-content-center">
        <PresentationCard title={title} content={content}></PresentationCard>
      </section>
      <section className="pb-2 display-flex justify-content-center">
        <FoodList
          foodItems={getFoodItems()}
          addCart={onAddToCartItem}
        ></FoodList>
      </section>
    </div>
  );
}

export default App;

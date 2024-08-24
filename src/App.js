import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./components/Card/";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./components/context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        `https://66a8d245e40d3aa6ff598e26.mockapi.io/cart`
      );
      const favoritesResponse = await axios.get(
        `https://66a8d245e40d3aa6ff598e26.mockapi.io/cart`
      );
      const itemsResponse = await axios.get(
        "https://66a8d245e40d3aa6ff598e26.mockapi.io/Items"
      );

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log("Adding to cart:", obj);
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://66a8d245e40d3aa6ff598e26.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post(`https://66a8d245e40d3aa6ff598e26.mockapi.io/cart`, obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://66a8d245e40d3aa6ff598e26.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://66a8d245e40d3aa6ff598e26.mockapi.io/cart/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          `https://66a8d245e40d3aa6ff598e26.mockapi.io/cart`,
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        isItemAdded,
        favorites,
        items,
        cartItems,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <CartDrawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                cartItems={cartItems}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path="/Favorites" exact element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

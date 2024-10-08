import React from 'react';
import Card from "../components/Card/";
import AppContext from '../components/context';

function Home({ 
    items, 
    searchValue, 
    setSearchValue, 
    onChangeSearchInput, 
    onAddToFavorite, 
    onAddToCart,
    isLoading
}) {
    const { isItemAdded }= React.useContext(AppContext);
 
    const renderItems = () => { 
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
          );
          return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              added ={isItemAdded(item && item.id)}
              {...item}
            />
          ));
    };


    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>
                    {searchValue
                      ? `Поиск по запросу: "${searchValue}"`
                      : "Все кроссовки"}
                </h1>
                <div className="search-block d-flex">
                    <img width={16} src="img/search.svg" alt="Search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue("")}
                            className="clear cu-p"
                            src="img/313131.png"
                            alt="Clear"
                        />
                    )}
                    <input onChange={onChangeSearchInput} placeholder="Поиск..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;

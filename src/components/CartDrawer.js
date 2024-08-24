import Info from "./Info";
import React from "react";
import AppContext from "./context";

function CartDrawer({ onClose, onRemove, items = [] }) {
  const { setCartItems } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  const onClickOrder = () => {
    setIsOrderComplete(true);
    setCartItems([]);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between cu-p">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            width={35}
            src="img\313131.png"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    width="30px"
                    className="removeBtn cu-p"
                    src="/img/313131.png"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">
                Оформить заказ
                <img className="arrow" src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}
export default CartDrawer;

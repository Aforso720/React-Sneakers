import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="align-center p-40">
      <div className="headerInfo">
        <Link to="/">
          <img width="50" height="50" src="img/logo.png" />
          <div>
            <h3 className="text-uppercase">React Sneackers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </Link>
      </div>
      <div className="headerRight">
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width="18" height="14" src="img/corzina.svg" alt="Корзина" />
            <span>1205 руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img width="20" height="20" src="img/heart.svg" alt="Закладки" />
            </Link>
          </li>
          <li>
            <img width="20" height="20" src="img/AVA.svg" alt="Пользователь" />
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;

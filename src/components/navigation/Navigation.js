import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navigation() {
    const itemsInBasket = useSelector((state) => state.basket.items);

    const totalCount = itemsInBasket?.length > 0 ? itemsInBasket.map(item => item.count).reduce((prev, curr) => prev + curr) : 0;

    return (
        <>
            <header className="header">
                <Link to="/"><img className="header__icon" src="automart-icon.jpg" alt="automart-icon"/></Link>
                
                <div className="header__title">Automart</div>
                {/* <div className="header__search">
                    <i class="fas fa-search"></i>
                    <input type="text" id="search" name="search" placeholder="Search for a part"/>
                </div> */}
                <div className="header__login">
                    <img className="header__login-icon" src="login.png" alt="automart-cart-icon"/>
                    <span className="header__login-label">Login</span>
                </div>
                <div className="header__cart">
                    <img className="header__cart-icon" src="cart.png" alt="automart-cart-icon"/>
                    <span className="header__cart-label">Cart</span>
                    {totalCount ? (<div className="header__cart-total">
                        {totalCount}
                    </div>) : null}
                </div>  
            </header>
            <div className="navigation">
                Customer service: +1 (999) 999-9999
            </div>
        </>
    );
}

export default Navigation;
  
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemImage from "../../common/ItemImage";
import { addItem } from "./basketSlice";
import { hidePopup } from "./popupSlice";

function DetailPopup() {
    const showID = useSelector((state) => state.popup.showID);
    const data = useSelector((state) => state.data.carParts);
    const basket = useSelector((state) => state.basket.items);

    const basketInfo = basket.find(b => b.id === showID);

    const [count, setCount] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        if (showID !== -1) {
            setCount(basketInfo ? basketInfo.count : 1)
        }
    }, [showID]);

    if (document.getElementById("popup")) {
        if (showID !== -1) {
            document.getElementById("popup").classList.add("expand");
            const timeout = setTimeout(() => {
                document.getElementById("popup").classList.add("display");
                clearTimeout(timeout);
            }, 100);
        } else {
            document.getElementById("popup").classList.remove("display");
            const timeout = setTimeout(() => {
                document.getElementById("popup").classList.remove("expand");
                clearTimeout(timeout);
            }, 100);
        }
    }

    const part = data.find(d => d.id === showID); 

    const closePopup = () => {
        dispatch(hidePopup());
        setCount(1);
    }

    const addToCart = () => {
        dispatch(addItem({id: showID, count}));
        closePopup();
    }

    return (
        <div id="popup" className="popup" onClick={() => closePopup()}> 
            <div className="popup__box" onClick={(event) => event.stopPropagation() }>
                {
                    part && (
                        <>
                            <div className="popup__box-header clearfix">
                                <button className="popup__box-close" onClick={() => closePopup()}>
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                    
                            <div className="popup__box-content">
                                <div class="popup__box-img">
                                    <ItemImage img={part.img}  type={part.type}/>
                                </div>
                                <div className="popup__box-text">
                                    
                                    <div class="popup__box-label">
                                        {part.brand + " " + part.model + " " + part.year.reduce((prev, curr) => prev + ", " + curr)}
                                        <br/>
                                        {part.type}
                                        {part.isBestSeller && (<div className="popup__box-bestseller"><i class="fa-solid fa-star"></i> Best Seller</div>) }
                                    </div>
                                    
                                    <div class="popup__box-price">
                                        {part.discount && <div className="popup__box-price-discount">
                                           
                                            {part.discountedPrice} CAD
                                        </div>}
                                        <div className={"popup__box-price-real" + (part.discount ? " sale" : "")}>{part.price} CAD</div>
                                        {part.discount && 
                                            <div className="popup__box-price-discount-amount">
                                                {/* <i class="fa-solid fa-tag"></i> */}
                                                Save %{part.discount.toFixed(0)}
                                            </div>    
                                            
                                        }
                                    </div>

                                    <div class="popup__box-basket">
                                        <div class="popup__box-count">
                                            <div class="popup__box-button" onClick={() => count > 1 && setCount(count - 1)}>
                                                -
                                            </div>
                                            <div class="popup__box-value">
                                                <input 
                                                    type="number" 
                                                    id="count" 
                                                    name="count" 
                                                    value={count} 
                                                />
                                            </div>
                                            <div class="popup__box-button" onClick={() => setCount(count + 1)}>
                                                +
                                            </div>
                                        </div>
                                        
                                        <button className="popup__box-basket-add" onClick={() => addToCart()}>
                                            {basketInfo ? <>Update Item</> : <>Add Item</>}
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default DetailPopup;
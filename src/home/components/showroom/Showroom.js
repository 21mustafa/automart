import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ItemImage from "../../../common/ItemImage";
import { showPopup } from "../../../components/detailpopup/popupSlice";
import { filterOnly } from "../../../query/querySlice";

function Showroom(props) {

    const dispatch = useDispatch();

    const getCards = (carInfo) => {
        const cards = [];
        let carInfoToDisplay = carInfo.length >= 10 ? carInfo.slice(0, 10) : carInfo;
        carInfoToDisplay.forEach(info => {
            cards.push(
                <div className="showroom__card-container"> 
                    {info.isBestSeller && (<div className="item-bestseller"><i class="fa-solid fa-star"></i> Best Seller</div>) }
                    <div className="showroom__card" onClick={() => dispatch(showPopup(info.id))}>
                        <div className="showroom__card-icon-container">
                            <ItemImage img={info.img} class="showroom__card-icon" type={info.type}/>
                        </div>
                        <div className="showroom__card-label">
                            {info.brand + " - " + info.model + " - " + info.type}
                        </div>

                        {info.discount && <div className="showroom__card-new-price">{info.discountedPrice} CAD</div>}
                        <div className={"showroom__card-price " + (info.discount ? "sale" : "")}>
                            {info.price} CAD
                        </div>
                    </div>
                </div>
            );
        });
        return cards;
    }

    const onCategorySelection = () => {
        dispatch(filterOnly(props.filter));
    }

    return (
        props.data.length > 0 && <section className="showroom" id={props.id}>
            <h2 className="showroom__label">
                <span className="showroom__label--orange">{props.label}</span>
                {
                    props.data.length >= 10 && (
                        <Link to="/query">
                            <button className="showroom__label--more" onClick={onCategorySelection}>
                                Show more <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </button>
                        </Link>
                    )
                }
            </h2>
            <div className="showroom__card-list">
                {getCards(props.data)}
            </div>
        </section>
    );
}

export default Showroom;
  
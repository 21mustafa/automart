import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemImage from "../common/ItemImage";
import { showPopup } from "../components/detailpopup/popupSlice";
import Filter from "./components/Filter";
import { sortByPrice } from "./querySlice";

function QueryPage() {

    const appData = useSelector((state) => state.data.carParts);
    const query = useSelector((state) => state.query.query);
    const sortState = useSelector((state) => state.query.sortState);
    const itemsInBasket = useSelector((state) => state.basket.items);

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getDisplayData = () => {
        let filteredData = [...appData];

        if (sortState === "ASC") {
            filteredData.sort((e1, e2) =>  {
                const firstPrice = e1.discount ? e1.discountedPrice : e1.price;
                const secondPrice = e2.discount ? e2.discountedPrice : e2.price;
                return +firstPrice - +secondPrice;
            });
        } else if (sortState === "DSC") {
            filteredData.sort((e1, e2) =>  {
                const firstPrice = e1.discount ? e1.discountedPrice : e1.price;
                const secondPrice = e2.discount ? e2.discountedPrice : e2.price;
                return +secondPrice - +firstPrice;
            });
        }

        if (query.brand) {
            filteredData = filteredData.filter(d =>  d.brand === query.brand);
        }

        if (query.model) {
            filteredData = filteredData.filter(d =>  d.model === query.model);
        }

        // if (query.year) {
        //     filteredData = filteredData.filter(d =>  d.year.toString() === query.year.toString());
        // }

        if (query.part) {
            filteredData = filteredData.filter(d =>  d.type.includes(query.part));
        }

        if (query.partDetailFR) {
            filteredData = filteredData.filter(d =>  d.type.includes(query.partDetailFR));
        }

        if (query.partDetailLR) {
            filteredData = filteredData.filter(d =>  d.type.includes(query.partDetailLR));
        }

        if (query.bestSeller) {
            filteredData = filteredData.filter(d =>  d.isBestSeller);
        }

        if (query.onSale) {
            filteredData = filteredData.filter(d =>  !!d.discount);
        }

        return filteredData;
    }

    const getItems = () => {
        const items = [];
        
        getDisplayData().forEach((d) => {
            const isInBasket = !!itemsInBasket.find(i => i.id === d.id);
            
            items.push(
                <div className={"query__results-item" + (isInBasket ? " added-to-basket" : "")} onClick={() => dispatch(showPopup(d.id))}>
                    <div className="query__results-item-img">
                        <ItemImage img={d.img} class="query__results-item-img-element" type={d.type}/>
                    </div>                    
                    <div className="query__results-item-label">
                        <div className="query__results-item-label-brand">
                            {d.brand + "  " + d.model + " - " + d.type}
                        </div>
                        {d.isBestSeller && (<div className="query__results-item-bestseller"><i class="fa-solid fa-star"></i> Best Seller</div>) }
                    </div>
                    <div className="query__results-item-price">
                        {d.discount && <div className="query__results-item-price-discount">
                            <div className="query__results-item-price-discount-amount">
                                <i class="fa-solid fa-tag"></i>
                                Save %{d.discount.toFixed(0)}
                            </div>    
                            
                            {d.discountedPrice} CAD
                        </div>}
                        <div className={"query__results-item-price-real" + (d.discount ? " sale" : "")}>{d.price} CAD</div>
                    </div>
                </div>
            );
        });

        return items;
    }

    const sortData = () => {
        if (sortState === "") {
            dispatch(sortByPrice("ASC"));
        } else if (sortState === "ASC") {
            dispatch(sortByPrice("DSC"));
        } else if (sortState === "DSC") {
            dispatch(sortByPrice(""));
        }
    }

    return (<section className="query">
        <Filter/>
        <div className="query__results">
            <div className="query__results-sort clearfix"> 
                <button className="query__results-sort-button" onClick={sortData}>
                    {sortState === "ASC" && <>
                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        Price: Low to High
                    </>}
                    {sortState === "DSC" && <>
                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        Price: High to Low
                    </>}
                    {sortState === "" && <>
                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        Sort by Price
                    </>}
                </button>
            </div>
            
            {getItems()}
        </div>
    </section>);
}

export default QueryPage;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, filterOnly, resetFilter } from "../querySlice";

function Filter() {

    const appData = useSelector((state) => state.data.carParts);
    const query = useSelector((state) => state.query.query);

    const dispatch = useDispatch();

    useEffect(() => {
        const queryStr = sessionStorage.getItem("query");
        if (queryStr)  {
            const queryJson = JSON.parse(queryStr);
            dispatch(
                filterOnly(queryJson)       
            );
            sessionStorage.clear();
        }
    }, []);

    const getModels = () => {
        const modelElements = [];
        const models = Array.from(new Set(appData.filter(d => d.brand === query.brand).map((d) => d.model)));
        
        models.forEach((model) => {
            modelElements.push(<option value={model}>{model}</option>);
        });

        return modelElements;
    }

    const getYears = () => {
        const yearElements = [];
        
        for (let i = 2019; i >= 2016; i--) {
            yearElements.push(<option value={i}>{i}</option>);
        }
        return yearElements;
    }

    const getParts = () => {
        const partElements = [];
        const parts = Array.from(new Set(appData.map(d => 
            d.type.replace("Left ", "").replace("Right ", "").replace("Front ", "").replace("Rear ", "")
        )));

        parts.forEach((part) => {
            partElements.push(<option value={part}>{part}</option>);
        });
        return partElements;
    }

    const onBrandChange = (event) => {
        dispatch(filter({
            brand: event.target.value,
            model: "",
            year: ""
        }));
    }

    const onModelChange = (event) => {
        dispatch(filter({
            model: event.target.value,
            year: ""
        }));
    }

    const onYearChange = (event) => {
        dispatch(filter({
            year: event.target.value,
        }));
    }

    const onPartChange = (event) => {
        dispatch(filter({
            part: event.target.value,
            partDetailFR: "",
            partDetailLR: ""
        }));
    }

    const onLeftRightChange = (event) => {
        dispatch(filter({
            partDetailLR: event.target.value,
        }));
    }

    const onFrontRearChange = (event) => {
        dispatch(filter({
            partDetailFR: event.target.value,
        }));
    }

    const onBestSellerChange = (event) => {
        dispatch(filter({
            bestSeller: event.target.checked,
        }));
    }

    const onSaleCheckboxChange = (event) => {
        dispatch(filter({
            onSale: event.target.checked,
        }));
    }
    
    const getPartDetailDropdown = () => {
        let detailElements = [];
        if (query.part) {
            const details = Array.from(new Set(appData.filter(d => 
                d.type.includes(query.part)
            ).map(d => d.type)));
            
            const isLeftAndRight = !!details.find(d => d.includes("Left"));
            const isRearAndFront = !!details.find(d => d.includes("Rear"));

            isLeftAndRight && detailElements.push(
                <div className="query__question-container">
                    <select 
                        className="query__question-container-dropdown" 
                        name="leftright" 
                        id="leftright" 
                        defaultValue={""}
                        onChange={onLeftRightChange}
                        value={query.partDetailLR}
                    >
                        <option value="" disabled selected>Left & Right</option>,
                        <option value="Left">Left</option>,
                        <option value="Right">Right</option>
                    </select>
                </div>
            );

            isRearAndFront && detailElements.push(
                <div className="query__question-container">
                    <select 
                        className="query__question-container-dropdown" 
                        name="rearfront" 
                        id="rearfront" 
                        defaultValue={""}
                        onChange={onFrontRearChange}
                        value={query.partDetailFR}
                    >
                        <option value="" disabled selected>Front & Rear</option>,
                        <option value="Front">Front</option>,
                        <option value="Rear">Rear</option>
                    </select>
                </div>
            );
        }
        return detailElements;
    }

    return (
        <div className="query__question">
            <button className="query__question-reset" onClick={() => dispatch(resetFilter())}>
                Clear Filters
            </button>
            <div className="query__question-section">
                <h2>
                    Vehicle Related Filters
                </h2>
                <div className="query__question-container">
                    <select 
                        className="query__question-container-dropdown" 
                        name="brand" 
                        id="brand" 
                        onChange={onBrandChange} 
                        defaultValue="" 
                        value={query.brand}
                    >
                        <option value="" disabled>Brand</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Hyundai">Hyundai</option>
                    </select>
                </div>

                <div className="query__question-container">
                    <select 
                        disabled={!query.brand}
                        className="query__question-container-dropdown" 
                        name="model" 
                        id="model"
                        defaultValue="" 
                        value={query.model}
                        onChange={onModelChange}
                    >
                        <option value="" disabled>Model</option>
                        {getModels()}
                    </select>
                </div>

                <div className="query__question-container">
                    <select 
                        disabled={!query.model}
                        className="query__question-container-dropdown" 
                        name="year" 
                        id="year"
                        defaultValue=""
                        value={query.year}
                        onChange={onYearChange}  
                    >
                        <option value="" disabled>Year</option>
                        {getYears()}
                    </select>
                </div>
            </div>
            <div className="query__question-section">
                <h2>Car Part Related Filters</h2>
                <div className="query__question-container checkbox-container">
                    <input 
                        className="query__question-box" 
                        type="checkbox" 
                        id="bestSeller" 
                        name="bestSeller" 
                        value="bestSeller"
                        onClick={onBestSellerChange}
                        checked={query.bestSeller}
                        defaultChecked={false}
                    />
                    <label className="query__question-box-label" for="bestSeller">Best Seller</label>
                </div>

                <div className="query__question-container checkbox-container">
                    <input 
                        className="query__question-box" 
                        type="checkbox" 
                        id="onSale" 
                        name="onSale" 
                        value="onSale"
                        onClick={onSaleCheckboxChange}
                        checked={query.onSale}   
                        defaultChecked={false} 
                    />
                    <label className="query__question-box-label" for="onSale">On sale</label>
                </div>

                <div className="query__question-container">
                    <select 
                        className="query__question-container-dropdown" 
                        name="part" 
                        id="part"
                        defaultValue=""
                        value={query.part}
                        onChange={onPartChange}
                    >
                        <option value="" disabled>Part Name</option>
                        {getParts()}
                    </select>
                </div>

                {getPartDetailDropdown()}
            </div>
        </div>
    );
}

export default Filter;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Search() {
    const [filter, setFilter] = useState({});
    
    const appData = useSelector((state) => state.data.carParts);

    useEffect(() => {
        return () => {
            setFilter({});
        }
    }, []);

    const getModels = () => {
        const modelElements = [];
        const models = Array.from(new Set(appData.filter(d => d.brand === filter.brand).map((d) => d.model)));
        
        models.forEach((model) => {
            modelElements.push(<option value={model}>{model}</option>);
        });

        return modelElements;
    }

    const getYears = () => {
        const yearElements = [];
        for (let i = 2019; i >= 2016; i--) {
            yearElements.push(<option key={i}>{i}</option>);
        }
        return yearElements;
    }

    const onBrandChange = (event) => {
        setFilter({
            brand: event.target.value
        });
    }

    const onModelChange = (event) => {
        setFilter({
            ...filter,
            model: event.target.value
        });
    }

    const onYearChange = (event) => {
        const queryAsStr = JSON.stringify({
            ...filter,
            year: event.target.value
        })

        sessionStorage.setItem("query", queryAsStr);
        window.location = window.location.protocol + '//' + window.location.host + "/query";
    }

    return (
        <section className="search">
            <div className="search-container">
                <div className="search__item active">
                    <label for="brand" className="search__item-label">
                        Step <span className="search__item-label--orange">1</span>
                    </label>
                    <select 
                        className="search__item-dropdown" 
                        name="brand" 
                        id="brand" 
                        onChange={onBrandChange}
                        value={filter.brand}
                        defaultValue=""
                    >
                        <option value="" disabled>Brand</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Hyundai">Hyundai</option>
                    </select>
                </div>

                <div className="search__next">
                    <i class="fa-solid fa-angle-right"></i>
                </div>

                <div className={"search__item " + (!filter.brand ? "" : "active")}>
                    <label for="model" className="search__item-label">
                        Step <span className="search__item-label--orange">2</span>
                    </label>
                    <select 
                        disabled={!filter.brand} 
                        className="search__item-dropdown" 
                        name="model" 
                        id="model"
                        onChange={onModelChange}
                        value={filter.model}
                        defaultValue=""
                    >
                        <option value="" disabled>Model</option>
                        {getModels()}
                    </select>
                </div>

                <div className="search__next">
                    <i class="fa-solid fa-angle-right"></i>
                </div>

                <div className={"search__item " + (!filter.model ? "" : "active")}>
                    <label for="year" className="search__item-label">
                        Step <span className="search__item-label--orange">3</span>
                    </label>
                    <select 
                        disabled={!filter.model} 
                        className="search__item-dropdown" 
                        name="year" 
                        id="year"
                        onChange={onYearChange}
                        value={filter.year}
                        defaultValue=""
                    >
                        <option value="" disabled>Year</option>
                        {getYears()}
                    </select>
                </div>
            </div>
        </section>
    );
}

export default Search;
  
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterOnly } from "../../../query/querySlice";

function Category() {
    const dispatch = useDispatch();

    const onCategorySelection = (partName) => {
        dispatch(filterOnly({
            part: partName,
            partDetailFR: "",
            partDetailLR: ""
        }));
    }

    return (
        <section className="category">
            <h2 className="category__label"><span className="category__label--orange">Online</span> Spare Parts</h2>

            <div className="category__card-list">
                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Bumper")}>
                        <div className="category__card-icon-container">
                            <img className="category__card-icon" src="front-pumper.png" alt="front bumper"/>
                        </div>
                        <div className="category__card-label">
                            Bumper
                        </div>
                    </div>
                </Link>

                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Headlamp")}>
                        <div className="category__card-icon-container">
                            <img style={{"width": "9rem", "paddingTop": "1.5rem"}} className="category__card-icon" src="headlight.png" alt="head light"/>
                        </div>
                        <div className="category__card-label">
                            Head Lamp
                        </div>
                    </div>
                </Link>
                
                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Fog Lamp")}>
                        <div className="category__card-icon-container">
                            <img className="category__card-icon" src="fog-lamp.png" alt="fog lamp"/>
                        </div>
                        <div className="category__card-label">
                            Fog Lamp
                        </div>
                    </div>
                </Link>

                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Fender")}>
                        <div className="category__card-icon-container">
                            <img style={{"width": "11rem", "paddingTop": "1rem"}} className="category__card-icon" src="fender.png" alt="fender"/>
                        </div>
                        <div className="category__card-label">
                            Fender
                        </div>
                    </div>
                </Link>

                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Door")}>
                        <div className="category__card-icon-container">
                            <img style={{"width": "11rem", "paddingTop": "1rem"}} className="category__card-icon" src="car-door.png" alt="door"/>
                        </div>
                        <div className="category__card-label">
                            Door
                        </div>
                    </div>
                </Link>

                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Engine Hood")}>
                        <div className="category__card-icon-container">
                            <img className="category__card-icon" src="engine-hood.png" alt="engine hood"/>
                        </div>
                        <div className="category__card-label">
                            Engine Hood
                        </div>
                    </div>
                </Link>

                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Brake Pad")}>
                        <div className="category__card-icon-container">
                            <img style={{"width": "11rem", "paddingTop": "1rem"}} className="category__card-icon" src="brakepad.png" alt="break pad"/>
                        </div>
                        <div className="category__card-label">
                            Break Pad
                        </div>
                    </div>
                </Link>

                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Air Filter")}>
                        <div className="category__card-icon-container">
                            <img style={{"width": "9rem", "paddingTop": "1.5rem"}} className="category__card-icon" src="airfilter.png" alt="air filter"/>
                        </div>
                        <div className="category__card-label">
                            Air Filter
                        </div>
                    </div>
                </Link>

                <Link to="/query">
                    <div className="category__card" onClick={() => onCategorySelection("Oil Filter")}>
                        <div className="category__card-icon-container">
                            <img className="category__card-icon" src="oilfilter.png" alt="oil filter"/>
                        </div>
                        <div className="category__card-label">
                            Oil Filter
                        </div>
                    </div>
                </Link>
                
            </div>
        </section>
);
}

export default Category;
  